import React, { useMemo } from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';
import { CardContent } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useCardMovieWrapperLogic } from './use-card-movie-wrapper-logic';

const CardMovieWrapper: React.FC<CardMovieWrapperProps> = (props) => {
	const { id, mediaType, mode = 'default', ...otherProps } = props;
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
		state: { isFetching, isSelected, movieDetail },
	} = useCardMovieWrapperLogic({ currentWatchlistDetail, mode });

	return (
		<CardContent
			mode={mode}
			selected={isSelected}
			onSelect={onSelectCard}
			loading={isFetching || !movieDetail}
			id={Number(id)}
			backdropUrl={movieDetail?.backdrop_path || ''}
			mediaType={mediaType}
			overview={movieDetail?.overview || ''}
			posterUrl={movieDetail?.poster_path || ''}
			title={movieDetail?.title || ''}
			isInWatchlist={isInWatchlist}
			onAddToWatchlistClick={onAddToWatchlist}
			onRemoveFromWatchlistClick={onRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardMovieWrapper;
