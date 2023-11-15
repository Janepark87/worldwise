import styles from './styles/CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

export default function CountryList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.length) return <Message message="Add your first city by clicking on a city on the map!" />;

	const countries = cities.reduce((countriesArr, current) => {
		const alreadyHasCountry = countriesArr.map((country) => country.country).includes(current.country);

		return alreadyHasCountry
			? countriesArr //
			: [...countriesArr, { id: current.id, country: current.country, emoji: current.emoji }];
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
}
