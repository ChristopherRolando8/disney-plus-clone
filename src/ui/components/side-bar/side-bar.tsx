import { useState } from 'react';
import styles from './side-bar.module.scss';
import { SidebarProps } from './side-bar.type';
import { SidebarButton } from '../side-bar-button';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/constants/icon';

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { menus, ...otherProps } = props;

	const [expand, setIsExpand] = useState(false);

	const onMouseOver = () => setIsExpand(true);
	const onMouseOut = () => setIsExpand(false);

	return (
		<aside>
			<nav
				className={styles.sidebarRoot}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				{...otherProps}
			>
				<div className={styles.logoContainer}>
					<Link passHref href="/">
						<Image alt="Disney Hotstar" src={Icon.Hotstar} />
					</Link>
				</div>

				<div className={styles.sidebarButtonWrapper}>
					{menus.map((menu) => (
						<SidebarButton
							expanded={expand}
							key={menu.title}
							title={menu.title}
							url={menu.url}
							icon={menu.icon}
						/>
					))}
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
