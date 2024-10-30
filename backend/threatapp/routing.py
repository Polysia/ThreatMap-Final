from django.urls import re_path
from threatapp.consumers import *

websocket_urlpatterns = [
    re_path('ws/threats/', ThreatConsumer.as_asgi()),             # for views_2.py
    re_path('ws/daily_threats/', DailyThreatConsumer.as_asgi()),  # for views_3.py
]
