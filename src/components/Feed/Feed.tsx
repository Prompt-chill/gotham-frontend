import { useEffect, useState } from 'react';
import './Feed.css';

interface Alert {
  alertId: number;
  flightId: number;
  timestamp: number;
  type: 'MISC' | 'EXPLOSION_OR_CRASH' | 'NEW_FLIGHT' | 'ALARM';
  location: [number, number];
  locationName: string;
}

const alertTypeLabels: Record<Alert['type'], string> = {
  'NEW_FLIGHT': 'New Flight',
  'ALARM': 'Alarm',
  'MISC': 'Misc',
  'EXPLOSION_OR_CRASH': 'Explosion/Crash'
};

function Feed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api-demo/alerts.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Couldn't fetch alerts");
        }
        return response.json();
      })
      .then((data: Alert[]) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className='feedContainer'>
        <div className='feedContent'>
          <div className='feedItem'>
            <p>Ładowanie alertów...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='feedContainer'>
        <div className='feedContent'>
          <div className='feedItem'>
            <p>Błąd: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='feedContainer'> 
      <div className='feedContent'>
        {alerts.map((alert) => (
          <div key={alert.alertId} className='feedItem'>
            <h3>{alertTypeLabels[alert.type]}</h3>
            <p>{formatTime(alert.timestamp)} - {alert.locationName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;