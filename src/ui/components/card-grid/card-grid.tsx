import clsx from 'clsx';
import styles from './card-grid.module.scss';
import { CardGridProps } from './card-grid.type';
import { RenderIf } from '../render-if';

const CardGrid: React.FC<CardGridProps> = (props) => {
	const { title, children, ...otherProps } = props;

	return (
		<div className={styles.cardGridRoot} {...otherProps}>
			<div
				className={styles.cardGridWrapper}
				data-testid={`${title}-card-grid-wrapper`}
			>
				<RenderIf isTrue={!!title}>
					<h2 className={clsx(styles.titleText, 'font-h2')}>{title}</h2>
				</RenderIf>

				<div className={styles.wrapper}>{children}</div>
			</div>
		</div>
	);
};

export default CardGrid;
