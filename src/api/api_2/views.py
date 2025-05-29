from rest_framework import viewsets
from main.models import SystemLog
from .serializers import SystemLogSerializer
from main.api.permissions import IsAuthenticatedUser

class SystemLogViewSet(viewsets.ModelViewSet):
    queryset = SystemLog.objects.all()
    serializer_class = SystemLogSerializer
    permission_classes = [IsAuthenticatedUser]