sudo docker run -d -p 6379:6379 redis
celery -A logistics worker --loglevel=info
celery -A logistics beat
celery -A logistics flower

if worker does not work try this:
pipenv install eventlet
celery -A logistics worker --loglevel=info -P eventlet
