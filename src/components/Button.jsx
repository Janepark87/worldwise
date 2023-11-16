import styles from './styles/Button.module.css';

export default function Button({ children, onClick, type }) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
			{children}
		</button>
	);
}
