import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './MapOverlay.css';

interface Alert {
  alertId: number;
  flightId: number;
  timestamp: number;
  type: 'MISC' | 'EXPLOSION_OR_CRASH' | 'NEW_FLIGHT' | 'ALARM';
  location: [number, number];
  locationName: string;
  description: string;
}

const position: L.LatLngExpression = [52.237049, 21.017532];

const createEmojiIcon = (emoji: string) => {
  return L.divIcon({
    html: `<div style="font-size: 32px; line-height: 1;">${emoji}</div>`,
    className: 'emoji-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const alertIcons: Record<Alert['type'], L.DivIcon> = {
  'NEW_FLIGHT': createEmojiIcon('♦️'),
  'ALARM': createEmojiIcon('🚨'),
  'MISC': createEmojiIcon('❓'),
  'EXPLOSION_OR_CRASH': createEmojiIcon('💥')
};

const alertTypeLabels: Record<Alert['type'], string> = {
  'NEW_FLIGHT': 'New Flight',
  'ALARM': 'Alarm',
  'MISC': 'Misc',
  'EXPLOSION_OR_CRASH': 'Explosion/Crash'
};

function MapOverlay() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetch('/api-demo/alerts.json')
      .then(response => response.json())
      .then((data: Alert[]) => {
        setAlerts(data);
      })
      .catch(err => {
        console.error('Error fetching alerts:', err);
      });
  }, []);

  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('pl-PL', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <div className='mapOvelayContainer'>
        <MapContainer 
          center={position} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alerts.map((alert) => (
            <Marker 
              key={alert.alertId}
              position={alert.location as L.LatLngExpression}
              icon={alertIcons[alert.type]}
            >
              <Popup>
                <strong>{alertTypeLabels[alert.type]}</strong><br />
                {alert.locationName}<br />
                {formatDateTime(alert.timestamp)}<br />
                <br />
                <div style={{ fontSize: '13px' }}>{alert.description}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapOverlay;