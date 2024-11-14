from __future__ import absolute_import, unicode_literals  # For compatibility with older Python versions
import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'threatmap.settings')  # Update with your project name
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

app = Celery('threatmap')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(['threatapp'])  # Update with your app name

app.conf.beat_schedule = {
    'fetch-every-10-minutes': {
        'task': 'threatapp.tasks.periodic_fetch_and_store',  # Full path to the task
        'schedule': crontab(minute='*/1'),  # Every 10 minutes
    },
    'fetch-top5-country-data-daily': {
        'task': 'threatapp.tasks.periodic_fetch_top5_country_data',
        'schedule': crontab(minute='*/2'),
        #'schedule': crontab(hour=0, minute=0),  # Run once daily at midnight
    },
}