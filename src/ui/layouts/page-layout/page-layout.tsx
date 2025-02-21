import { Sidebar } from '@/ui/components';
import styles from './page-layout.module.scss';
import { PageLayoutProps } from './page-layout.type';
import { Menus } from '@/constants/menu';
import clsx from 'clsx';

// ? This is page layout that will be reused throughout all the pages (this includes sidebar)
const PageLayout: React.FC<PageLayoutProps> = (props) => {
	const { children, usePadding = true, ...otherProps } = props;

	return (
		<div className={styles.pageLayoutRoot} {...otherProps}>
			<Sidebar menus={Menus} />

			<main
				className={clsx(styles.childrenContainer, {
					[styles.usePadding]: usePadding,
				})}
			>
				{children}
			</main>
		</div>
	);
};

export default PageLayout;
