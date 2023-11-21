import Navbar from '../components/Navbar';

export default function Main({ className, children }) {
	return (
		<main className={className}>
			<Navbar />
			{children}
		</main>
	);
}
