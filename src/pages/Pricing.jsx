// Uses the same styles as Product
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import styles from './styles/Product.module.css';

export default function Pricing() {
	return (
		<Main className={styles.product}>
			<Section>
				<div>
					<h2>
						Simple pricing.
						<br />
						Just $9/month.
					</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos provident, laboriosam fugit
						voluptatem iste.
					</p>
				</div>
				<img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
			</Section>
		</Main>
	);
}
