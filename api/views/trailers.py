import time
import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from ..models import Trailer, TrailerLog
from ..serializers import TrailerSerializer, TrailerListSerializer, TrailerLogSerializer
from ..functions import check_permission, generate_action
from django.core.cache import cache


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def trailers(request):
    if request.method == 'GET':
        if check_permission(request.user, 'view', 'trailer'):
            if request.GET.get('id', None):
                trailer = Trailer.objects.get(pk=request.GET.get('id'))
                serializer = TrailerSerializer(trailer)
            elif request.GET.get('list'):
                if request.GET.get('filter'):
                    trailers = Trailer.objects.values('id', 'number').filter(role=request.GET.get('filter'))
                else:
                    trailers = Trailer.objects.values('id', 'number').all()
                serializer = TrailerListSerializer(trailers, many=True)
            else:
                
                trailers = Trailer.objects.all()
                serializer = TrailerSerializer(trailers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'you have no access to view trailers'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        if check_permission(request.user, 'create', 'trailer'):
            serializer = TrailerSerializer(data=request.data)
            if serializer.is_valid():
                new_trailer = serializer.save()
                generate_action(request.user.id, 'cre', new_trailer.id, 'tra')
                return Response({'success': 'trailer has been succesfully created'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create trailer'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        if check_permission(request.user, 'update', 'trailer'):
            request.data['request_user_id'] = request.user.id
            trailer = Trailer.objects.get(pk=request.data["id"])
            serializer = TrailerSerializer(instance=trailer, data=request.data)
            if serializer.is_valid():
                updated_trailer = serializer.save()
                generate_action(request.user.id, 'upd', updated_trailer.id, 'tra')
                return Response({'success': 'trailer has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to update trailer'}, status=status.HTTP_403_FORBIDDEN)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trailers_location(request):
    if request.method == 'GET':
        if check_permission(request.user, 'view', 'trailer'):
            cached_data = cache.get('trailers')
            return Response(cached_data, status=status.HTTP_200_OK)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trailer_logs(request):
    if check_permission(request.user, 'view', 'trailer'):
        t_from = request.GET.get('from')
        t_to = request.GET.get('to')
        trailer_id = request.GET.get('id')
        last_status = TrailerLog.objects.values('status', 'time').order_by("-time").filter(trailer_id=trailer_id, time__lt=t_from)[:1]
        if not last_status:
            last_status = [TrailerLog(status='s', time=datetime.datetime.now())]
        query = TrailerLog.objects.values('status', 'time').filter(trailer_id=trailer_id, time__gte=t_from, time__lte=t_to)
        last_status_serializer = TrailerLogSerializer(last_status, many=True)
        serializer = TrailerLogSerializer(query, many=True)
        return Response(last_status_serializer.data + serializer.data, status=status.HTTP_200_OK)