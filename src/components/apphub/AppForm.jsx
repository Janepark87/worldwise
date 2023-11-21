import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/AppForm.module.css';
import Button from '../Button';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import Message from '../Message';
import useUrlPosition from '../../hooks/useUrlPosition';
import { useCities } from '../../contexts/CitiesContext';
import { convertToEmoji } from '../../utils/convertToEmoji';
import { fromatString } from '../../utils/formatString';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GEO_CORDING_BASE_URL = import.meta.env.VITE_APP_GEO_CORDING_API_URL;

export default function Form() {
	const navigate = useNavigate();
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geocodingError, setGeocodingError] = useState('');
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [emoji, setEmoji] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');

	useEffect(() => {
		if (!lat && !lng) return;

		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				setGeocodingError('');
				const geoCordingEndPoint = `${GEO_CORDING_BASE_URL}?latitude=${lat}&longitude=${lng}`;
				const data = await (await fetch(geoCordingEndPoint)).json();

				if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😉");
				setCityName(fromatString(data.city) || fromatString(data.locality) || '');
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (err) {
				console.log(err.message);
				setGeocodingError(err.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		};
		fetchCityData();
	}, [lat, lng]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			position: { lat, lng },
			notes: notes.trim(),
		};

		await createCity(newCity);
		navigate('/app/cities');
	};

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng) return <Message message="Start by clicking somewhere on the map." />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form onSubmit={handleSubmit} className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<BackButton />
				<Button type="primary">Add</Button>
			</div>
		</form>
	);
}
