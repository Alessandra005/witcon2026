import json
import traceback
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.routers import DefaultRouter
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Attendee
from .serializers import AttendeeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from .models import Attendee
from .serializers import AttendeeSerializer

# Protected Attendee ViewSet
class AttendeeViewSet(viewsets.ModelViewSet):
    # queryset = Attendee.objects.all().order_by("-created_at")
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    filter_backends = [filters.SearchFilter]
    search_fields = ["first_name", "last_name", "email", "school"]
    #permission_classes = [IsAuthenticated]  # only logged-in users can access
    permission_classes = [AllowAny]  # testing 

# Public Registration View
class AttendeeCreateView(generics.CreateAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    permission_classes = [AllowAny]  # anyone can register
    parser_classes = (MultiPartParser, FormParser, JSONParser)

# Router for protected endpoints
router = DefaultRouter(trailing_slash=True)
router.register(r'attendees', AttendeeViewSet, basename='attendee')

# View to get attendee by user ID
@api_view(['GET'])
@permission_classes([AllowAny])
def get_attendee_by_user_id(request, user_id):
    try:
        attendee = Attendee.objects.get(user_id=user_id)
        serializer = AttendeeSerializer(attendee)
        return Response(serializer.data)
    except Attendee.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)



