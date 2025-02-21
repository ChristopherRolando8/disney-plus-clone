import clsx from 'clsx';
import styles from './tabs.module.scss';
import { TabsProps } from './tabs.type';

const Tabs: React.FC<TabsProps> = (props) => {
	const { tabs, onChange, value, useBorder = true, ...otherProps } = props;

	const onSelect: TabsProps['onChange'] = (value) => {
		if (onChange) onChange(value);
	};

	return (
		<div
			role="tablist"
			className={clsx(styles.tabsRoot, { [styles.tabBorder]: useBorder })}
			{...otherProps}
		>
			{tabs.map((tab) => {
				return (
					<div
						data-testid={`${tab.value}-tab-item`}
						role="tab"
						key={tab.id}
						className={styles.tabItem}
						onClick={() => onSelect(tab.value)}
					>
						<p
							className={clsx('font-h5', styles.tabLabelText, {
								[styles.selectedText]: value === tab.value,
								[styles.unselectedText]: value !== tab.value,
							})}
						>
							{tab.label}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
