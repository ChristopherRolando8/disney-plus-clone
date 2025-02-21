import Image from 'next/image';
import styles from './side-bar-button.module.scss';
import { SidebarButtonProps } from './side-bar-button.type';
import clsx from 'clsx';
import Link from 'next/link';

const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
	const { icon, title, url, expanded = false, ...otherProps } = props;

	return (
		<div
			className={styles.sidebarButtonRoot}
			role="button"
			data-testid={`${title}-sidebar-button`}
		>
			<Link href={url} passHref>
				<div className={styles.wrapper} {...otherProps}>
					<div className={styles.logoContainer}>
						<Image alt={`Go to ${title}`} src={icon} />
					</div>

					<p
						className={clsx(styles.title, 'font-h5', {
							[styles.expanded]: expanded,
							[styles.notExpanded]: !expanded,
						})}
					>
						{title}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default SidebarButton;
