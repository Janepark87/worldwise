import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';

const CitiesContext = createContext();
const CITIES_BASE_URL = import.meta.env.VITE_APP_CITIES_API_URL;
const initialState = {
	cities: [],
	currentCity: {},
	isLoading: false,
	error: '',
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true };
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case 'city/loaded':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case 'city/created':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
				cities: [action.payload, ...state.cities],
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				currentCity: {},
				cities: state.cities.filter((city) => city.id !== action.payload),
			};
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error(`Unknown action type ${action.type}`);
	}
};

export function CitiesProvider({ children }) {
	const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: 'loading' });

			try {
				const citiesEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities`;
				const data = await (await fetch(citiesEndpoint)).json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading data...' });
			}
		};
		fetchCities();
	}, []);

	const getCity = useCallback(
		async (id) => {
			if (Number(id) === currentCity.id) return;

			dispatch({ type: 'loading' });
			try {
				const cityEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities/${id}`;
				const data = await (await fetch(cityEndpoint)).json();
				dispatch({ type: 'city/loaded', payload: data });
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading data...' });
			}
		},
		[currentCity.id]
	);

	const createCity = async (newCity) => {
		dispatch({ type: 'loading' });
		try {
			const cityEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities`;
			const data = await (
				await fetch(cityEndpoint, {
					method: 'POST',
					body: JSON.stringify(newCity),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			).json();

			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error creating city.' });
		}
	};

	const deleteCity = async (deletedId) => {
		dispatch({ type: 'loading' });
		try {
			const cityEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities/${deletedId}`;
			await fetch(cityEndpoint, { method: 'DELETE' });
			dispatch({ type: 'city/deleted', payload: deletedId });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error deleting city.' });
		}
	};

	return <CitiesContext.Provider value={{ cities, currentCity, isLoading, error, getCity, createCity, deleteCity }}>{children}</CitiesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider.');
	return context;
}
