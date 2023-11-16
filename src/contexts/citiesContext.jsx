import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();

export function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const citiesApiUrl = import.meta.env.VITE_APP_CITIES_API_URL;
				const citiesEndpoint = import.meta.env.MODE === 'production' ? `${citiesApiUrl}/cities.json` : `${citiesApiUrl}/cities`;

				const data = await (await fetch(citiesEndpoint)).json();
				setCities(data);
			} catch (err) {
				console.log(err.message);
				alert('There was an error loading data...', err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	return <CitiesContext.Provider value={{ cities, isLoading }}>{children}</CitiesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider.');
	return context;
}
