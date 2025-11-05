import json
import traceback
from rest_framework import viewsets, filters
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
    permission_classes = [IsAuthenticated]  # only logged-in users can access

# Public Registration View
class AttendeeCreateView(generics.CreateAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    permission_classes = [AllowAny]  # anyone can register
    parser_classes = (MultiPartParser, FormParser, JSONParser)

# Router for protected endpoints
router = DefaultRouter(trailing_slash=True)
router.register(r'attendees', AttendeeViewSet, basename='attendee')


