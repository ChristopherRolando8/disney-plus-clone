import clsx from 'clsx';
import styles from './search-field.module.scss';
import { SearchFieldProps } from './search-field.type';
import { ChangeEventHandler } from 'react';
import Image from 'next/image';
import { RenderIf } from '../render-if';
import { Icon } from '@/constants/icon';

const SearchField: React.FC<SearchFieldProps> = (props) => {
	const { value, onChange, placeholder, ...otherProps } = props;

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (onChange) onChange(e.target.value);
	};

	const handleClear = () => {
		if (onChange) onChange('');
	};

	return (
		<div className={clsx(styles.searchFieldRoot)} {...otherProps}>
			<div className={styles.searchIconContainer}>
				<Image alt="Search" src={Icon.Search} />
			</div>

			<input
				className={styles.inputRoot}
				type="text"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
			/>

			<RenderIf isTrue={!!value}>
				<div
					className={styles.clearIconContainer}
					role="button"
					data-testid="clear-button"
					onClick={handleClear}
				>
					<Image alt="Clear" src={Icon.Clear} />
				</div>
			</RenderIf>
		</div>
	);
};

export default SearchField;
