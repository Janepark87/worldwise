import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/AppMap.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../../contexts/CitiesContext';
import useGeolocation from '../../hooks/useGeolocation';
import Button from '../Button';
import useUrlPosition from '../../hooks/useUrlPosition';

export default function Map() {
	const { cities } = useCities();
	const { loading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();
	const [mapLat, mapLng] = useUrlPosition();
	const [mapPosition, setMapPosition] = useState([40, 0]);

	useEffect(() => {
		if (mapLat & mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
	}, [geoLocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}

			<MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker key={city.id} position={[city.position.lat, city.position.lng]}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}
