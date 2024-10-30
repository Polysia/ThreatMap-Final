import requests
import xml.etree.ElementTree as ET
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

#@api_view(['GET'])
def threat_data_view(request=None):
    # Calculate the current date and 7 days before
    end_date = datetime.now().strftime('%Y-%m-%d')  # Current date
    start_date = (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d')  # 7 days ago

    # Fetch the XML data from the API
    url = f"https://isc.sans.edu/api/threatfeeds/perday/{start_date}/{end_date}"
    response = requests.get(url)

    # Parse the XML response
    root = ET.fromstring(response.content)

    # Initialize an empty list to store the results
    data = []

    # Iterate through the 'day' elements and extract 'date' and 'count'
    for day in root.findall('day'):
        date = day.find('date').text
        total_attacks = int(day.find('count').text)

        # Append the data to the list in the desired format
        data.append({
            "date": date,
            "TotalAttacks": total_attacks
        })
        
        # Send WebSocket update to the 'daily_threat_updates' group
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'daily_threat_updates',  # Group name for DailyThreatConsumer
        {
            'type': 'send_daily_threat_update',
            'threat_data': data
        }
    )

    # Return the data as a JSON response
    return Response(data)
