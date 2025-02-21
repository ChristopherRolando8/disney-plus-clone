import clsx from 'clsx';
import styles from './card-carousel.module.scss';
import { CardCarouselProps } from './card-carousel.type';
import Image from 'next/image';
import { useState } from 'react';
import { RenderIf } from '../render-if';
import { useCardCarouselLogic } from './use-card-carousel-logic';
import { Icon } from '@/constants/icon';

const CardCarousel: React.FC<CardCarouselProps> = (props) => {
	const { title, children, ...otherProps } = props;

	const {
		handlers: { scrollNext, scrollPrev },
		state: { renderNextArrow, renderPrevArrow, containerRef, scrollOffset },
	} = useCardCarouselLogic();

	const [hovered, setIsHovered] = useState(false);

	const onMouseOver = () => setIsHovered(true);
	const onMouseOut = () => setIsHovered(false);

	return (
		<div
			className={styles.cardCarouselRoot}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			{...otherProps}
		>
			<RenderIf isTrue={!!title}>
				<h2 className={clsx(styles.titleText, 'font-h2')}>{title}</h2>
			</RenderIf>

			<div className={styles.wrapper}>
				<div className={styles.cardWrapper}>
					<div
						className={styles.cardContainer}
						ref={containerRef}
						data-testid={`card-carousel${title || ''}`}
						style={{
							transform: `translateX(-${scrollOffset}px)`,
							transition: 'transform 0.3s ease-in-out',
						}}
					>
						{children}
					</div>
				</div>

				<RenderIf isTrue={renderPrevArrow}>
					<div
						onClick={scrollPrev}
						data-testid="prev-button"
						className={clsx(styles.leftArrowContainer, {
							[styles.hide]: !hovered,
							[styles.show]: !!hovered,
						})}
					>
						<div className={styles.logoContainer}>
							<Image alt="Previous" src={Icon.Back} />
						</div>
					</div>
				</RenderIf>

				<RenderIf isTrue={renderNextArrow}>
					<div
						onClick={scrollNext}
						data-testid="next-button"
						className={clsx(styles.rightArrowContainer, {
							[styles.hide]: !hovered,
							[styles.show]: !!hovered,
						})}
					>
						<div className={styles.logoContainer}>
							<Image alt="Next" src={Icon.Forward} />
						</div>
					</div>
				</RenderIf>
			</div>
		</div>
	);
};

export default CardCarousel;
