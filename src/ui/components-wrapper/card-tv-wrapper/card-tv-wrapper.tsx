import React, { useMemo } from 'react';
import { CardTvWrapperProps } from './card-tv-wrapper.type';
import { CardContent } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useCardTvWrapperLogic } from './use-card-tv-wrapper-logic';

const CardTvWrapper: React.FC<CardTvWrapperProps> = (props) => {
	const { id, mediaType, mode, ...otherProps } = props;

	const currentWatchlistDetail = useMemo(
		() => ({
			id: `${mediaType}${id}`,
			mediaType,
			mediaId: id,
		}),
		[mediaType, id],
	);

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail,
	});

	const {
		handlers: { onSelectCard },
		state: { isFetching, isSelected, tvDetail },
	} = useCardTvWrapperLogic({ currentWatchlistDetail, mode });

	return (
		<CardContent
			mode={mode}
			selected={isSelected}
			onSelect={onSelectCard}
			loading={isFetching || !tvDetail}
			id={Number(id)}
			backdropUrl={tvDetail?.backdrop_path || ''}
			mediaType={mediaType}
			overview={tvDetail?.overview || ''}
			posterUrl={tvDetail?.poster_path || ''}
			isInWatchlist={isInWatchlist}
			title={tvDetail?.name || ''}
			onAddToWatchlistClick={onAddToWatchlist}
			onRemoveFromWatchlistClick={onRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardTvWrapper;
