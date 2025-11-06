# from django.contrib import admin
# from django.urls import path, include
# from attendees.views import AttendeeViewSet
# from attendees.views import router 

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', include(router.urls)), 
# ]

# attendees/urls.py
from django.contrib import admin
from django.urls import path, include
from .views import AttendeeCreateView, get_attendee_by_user_id, router  # import your new view and existing router

urlpatterns = [
    # Admin panel
    # path('admin/', admin.site.urls),

    # Public registration endpoint
    path('attendees/create/', AttendeeCreateView.as_view(), name='attendee-create'),

    # Protected admin endpoints (attendees list, detail, etc.)
    path('', include(router.urls)),

    # Endpoint to get attendee by user ID
    path('attendees/<str:user_id>/', get_attendee_by_user_id, name='attendee-by-user-id'),
]



