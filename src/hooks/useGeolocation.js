import { useState } from 'react';

export default function Geolocation(defaultPosition = null) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [position, setPosition] = useState(defaultPosition);

	const getPosition = () => {
		if (!navigator.geolocation) return setError('Your brwser does not support geolocation');

		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setLoading(false);
			},
			(error) => {
				setError(error.message);
				setLoading(false);
			}
		);
	};

	return { loading, error, position, getPosition };
}
