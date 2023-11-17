import { Link } from 'react-router-dom';
import styles from './styles/CityItem.module.css';
import { useCities } from '../../contexts/citiesContext';
import { formatDate } from '../../utils/formatDate';

export default function CityItem({ city }) {
	const { currentCity } = useCities();
	const {
		id,
		cityName,
		emoji,
		date,
		position: { lat, lng },
	} = city;

	return (
		<li>
			<Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
}
