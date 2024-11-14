from django.urls import path
from .views import *
from .views_2 import *
from .views_3 import *
from .views_incidents import *

urlpatterns = [
    path('fetch_top5_threats/', fetch_top5_country_data, name='fetch_threat_data'),
    path('display_top5_threats/', display_threat_data, name='display_threat_data'),
    path('fetch/',fetch_threat_and_store),
    path('display/',display_threats),
    path('a/<str:start_date>/<str:end_date>/',fetch_daily_data),
    path('incidents/', fetch_incidents_and_store ),
    path('dis_inci/', display_incidents ),
]