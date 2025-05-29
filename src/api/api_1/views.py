from rest_framework import viewsets
from main.models import UserData
from .serializers import UserDataSerializer
from main.api.permissions import IsAuthenticatedUser

class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticatedUser]