import { TabPanelProps } from './tab-panel.type';
import styles from './tab-panel.module.scss';
import clsx from 'clsx';

const TabPanel: React.FC<TabPanelProps> = (props) => {
	const { children, currentValue, value } = props;

	const isSelected = currentValue === value;

	if (isSelected)
		return (
			<div
				role="tabpanel"
				className={clsx('tabPanelRoot', {
					[styles.selected]: isSelected,
					[styles.unselected]: !isSelected,
				})}
			>
				{children}
			</div>
		);

	return null;
};

export default TabPanel;
