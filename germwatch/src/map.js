import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../store/actions/statisticsActions';
import './MapView.scss';

function map() {
  const dispatch = useDispatch();
  const statistics = useSelector(state => state.statistics.data);
  const loading = useSelector(state => state.statistics.loading);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {statistics.map(stat => (
        <CircleMarker
          key={stat.id}
          center={[stat.location.latitude, stat.location.longitude]}
          radius={Math.sqrt(stat.cases) * 0.5}
          fillColor="red"
          color="darkred"
          fillOpacity={0.7}
          stroke={false}
        >
          <Popup>
            <div>
              <strong>{stat.disease.name}</strong>
              <p>{stat.location.name}</p>
              <p>Cases: {stat.cases}</p>
              <p>Deaths: {stat.deaths}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default map;