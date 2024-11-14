from celery import shared_task
from threatapp.views import*
from threatapp.views_2 import *
from threatapp.views_3 import *
from threatapp.views_4 import *
from threatapp.views_incidents import *

import time

@shared_task
def periodic_fetch_and_store():
    
    try:
        """A Celery task to periodically fetch and store data."""
        print("Fetching the Daily Attacks")
        fetch_daily_data()
        
        print("Fetching the Threats")
        fetch_threat_and_store()
        
        print("Fetching the Incidents")
        fetch_incidents_and_store()

        #time.sleep(1)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        
        
@shared_task
def periodic_fetch_top5_country_data():
    
    try:
    # This will call the view function directly
        print("Fetching the Top5_Country_Attacks")
        fetch_top5_country_data() 
        
        print("Fetching the Top5_Industry_Attacks")
        top_attacked_industries()
    
    
    except Exception as e:
        print(f"An error occurred: {e}")       
    
    
        



