import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './MapOverlay.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface Alert {
  alertId: number;
  flightId: number;
  timestamp: number;
  type: 'MISC' | 'EXPLOSION_OR_CRASH' | 'NEW_FLIGHT' | 'ALARM';
  location: [number, number];
  locationName: string;
}

const position: L.LatLngExpression = [52.237049, 21.017532];

// Create a red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Fallback red icon using data URI
const redIconFallback = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEuNCAwLjIgMi44IDAuNyA0LjFsOS42IDE5LjJjMC40IDAuOCAxLjIgMS4yIDIuMiAxLjJzMS44LTAuNCAyLjItMS4ybDkuNi0xOS4yYzAuNC0xLjMgMC43LTIuNyAwLjctNC4xQzI1IDUuNiAxOS40IDAgMTIuNSAwem0wIDE4LjdjLTMuNCAwLTYuMi0yLjgtNi4yLTYuMnMyLjgtNi4yIDYuMi02LjIgNi4yIDIuOCA2LjIgNi4yLTIuOCA2LjItNi4yIDYuMnoiIGZpbGw9IiNkYzM1NDUiLz48L3N2Zz4=',
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const alertTypeLabels: Record<Alert['type'], string> = {
  'NEW_FLIGHT': 'Nowy lot',
  'ALARM': 'Alarm',
  'MISC': 'Inne',
  'EXPLOSION_OR_CRASH': 'Eksplozja/Katastrofa'
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

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pl-PL', { 
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
              icon={redIconFallback}
            >
              <Popup>
                <strong>{alertTypeLabels[alert.type]}</strong><br />
                {alert.locationName}<br />
                {formatTime(alert.timestamp)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapOverlay;