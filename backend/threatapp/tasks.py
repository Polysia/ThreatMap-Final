from celery import shared_task
from threatapp.views_2 import fetch_and_store_threat_data
import time

@shared_task
def periodic_fetch_and_store():
    
    try:
        """A Celery task to periodically fetch and store data."""
        print("Fetching and storing data...")
        fetch_and_store_threat_data()
        time.sleep(1)
        
    except Exception as e:
        print(f"An error occurred: {e}")


