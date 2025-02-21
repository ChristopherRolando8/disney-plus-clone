import { PageLayout } from '@/ui/layouts';
import styles from './not-found-main.module.scss';
import { Icon } from '@/constants/icon';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.notFoundMain}>
				<div className={styles.noResultContainer}>
					<div className={styles.noResultImageContainer}>
						<Image alt="Page not found" src={Icon.NoResult} />
					</div>

					<h1 className={clsx(styles.noResultText, 'font-h1')}>
						The page you are looking for is not found.
					</h1>

					<h2 className={clsx(styles.noResultDetailText, 'font-h2')}>
						Click{' '}
						<Link href="/" passHref>
							<span className={styles.notFoundTextCTA}>here</span>
						</Link>{' '}
						to browse for movies and TV series
					</h2>
				</div>
			</div>
		</PageLayout>
	);
};

export default NotFoundMain;
