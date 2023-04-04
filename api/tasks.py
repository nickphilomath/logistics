import os
import requests
from time import sleep
from celery import shared_task
from django.core.cache import cache
from .models import Trailer, TrailerLog
from .serializers import TrailerLogSerializer
# from logistics.celery import app

SAMSARA_API_KEY_SAM = os.getenv('SAMSARA_API_KEY_SAM')
SAMSARA_API_KEY_ASCOT = os.getenv('SAMSARA_API_KEY_ASCOT')
SAMSARA_UNITS_URL = "https://api.samsara.com/fleet/vehicles/stats/feed"
SAMSARA_TRAILERS_URL = "https://api.samsara.com/v1/fleet/assets/locations"

# @app.task
@shared_task
def notify_customers(message):
    print('*** Sending 1000 messages....')
    print('***', message)
    sleep(3)
    print('*** Emails were successfully sent!')


@shared_task
def update_trailers():
    # requesting data
    response = requests.request("GET", SAMSARA_TRAILERS_URL, headers={
        "Accept": "application/json",
        "Authorization": SAMSARA_API_KEY_SAM
    }).json()
    response2 = requests.request("GET", SAMSARA_TRAILERS_URL, headers={
        "Accept": "application/json",
        "Authorization": SAMSARA_API_KEY_ASCOT
    }).json()

    # separating required data
    data = []
    db_trailers = Trailer.objects.all().values('id', 'samsara_id', 'number')

    for r in response['assets'] + response2['assets']:
        trailer = {
            'id': None,
            'samsara_id': r['id'],
            'number': r['name'],
            # 'assetSerialNumber': r['assetSerialNumber'],
            'location': r['location'][0]['location'],
            'latitude': r['location'][0]['latitude'],
            'longitude': r['location'][0]['longitude'],
            'speed': r['location'][0]['speedMilesPerHour'],
            # 'timeMs': r['location'][0]['timeMs'],
        }
        for db_t in db_trailers:
            if trailer['samsara_id'] == db_t['samsara_id']:
                trailer['id'] = db_t['id']
                break

        # create new trailer if not found
        if not trailer['id']:
            new_trailer = Trailer()
            new_trailer.number = trailer['number']
            new_trailer.samsara_id = trailer['samsara_id']
            new_trailer.status = 'ius'
            new_trailer.save()
        
        data.append(trailer)

    cache.set('trailers', data)


@shared_task
def log_trailers():
    # latest_log = TrailerLog.objects.filter(trailer_id=81).latest('time')
    # print(latest_logs.id, latest_logs.time)
    data = cache.get('trailers')
    for d in data:
        if d['id']:
            if d['speed'] == 0:
                status = 's'
            else:
                status = 'm'
            
            try:
                latest_log = TrailerLog.objects.values('status').filter(trailer_id=d['id']).latest('time')
            except:
                latest_log = {'status': 's'}
                
            if not latest_log['status'] == status:
                log = TrailerLog()
                log.trailer_id = d['id']
                log.status = status
                log.latitude = d['latitude']
                log.longitude = d['longitude']
                log.location = d['location']
                log.save()



