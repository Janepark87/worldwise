import styles from './styles/CityItem.module.css';

export default function CityItem({ city }) {
	const { cityName, emoji, date } = city;

	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>({formatDate(date)})</time>
			<button className={styles.deleteBtn}>&times;</button>
		</li>
	);
}

function formatDate(date) {
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
}
