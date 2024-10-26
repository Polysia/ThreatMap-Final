import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class ThreatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # When a client connects to the WebSocket
        await self.accept()
        await self.channel_layer.group_add('threat_updates', self.channel_name)  # Adds the WebSocket to a group

        ''' # **Send older threat data from MongoDB to the connected client**
        from pymongo import MongoClient
        client = MongoClient('mongodb://localhost:27017/')  # MongoDB connection
        db = client['threatdata']  # Your MongoDB database name
        threat_data = db['new2']  # Your MongoDB collection name

        # Fetch old threat data from MongoDB
        older_data = list(threat_data.find({}, {'_id': 0}).sort('_id', -1))  # Fetch all data, excluding '_id'
        
        # Send the older data to the connected WebSocket client
        if older_data:
            await self.send(text_data=json.dumps({
                'older_data': older_data
            }))'''

    async def disconnect(self, close_code):
        # When a client disconnects
        await self.channel_layer.group_discard('threat_updates', self.channel_name)

    async def receive(self, text_data):
        pass  # You can handle incoming WebSocket messages here if needed

    async def send_threat_update(self, event):
        # Send threat data to the WebSocket
        threat_data = event['threat_data']
        await self.send(text_data=json.dumps({
            'threat_data': threat_data  # Send threat data as JSON to frontend
        }))

def push_threat_update(threat_info):
    """Send a WebSocket message to all clients with new threat data."""
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'threat_updates',  # The group name (all WebSocket clients in this group will receive the message)
        {
            'type': 'send_threat_update',  # This maps to the 'send_threat_update' method in ThreatConsumer
            'threat_data': threat_info
        }
    )
