import styles from './styles/Message.module.css';

export default function Message({ message, emoji = true, className = '' }) {
	return (
		<p className={`${styles.message} ${className ? styles[className] : ''}`}>
			{emoji && <span role="img">👋</span>} {message}
		</p>
	);
}
