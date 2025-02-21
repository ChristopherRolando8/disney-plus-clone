import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { seasonAdapter } from './season.slice';
import memoize from 'lodash/memoize';
import { selectTvById } from '../tv';

const { selectEntities } = seasonAdapter.getSelectors<RootState>(
	(state) => state.season,
);

export const selectSeasonById = memoize((seasonId?: string) =>
	createSelector(
		selectEntities,
		(seasonEntities) => seasonEntities[seasonId || ''] || null,
	),
);

export const selectTvSeasonsByTvId = memoize((tvId?: number) =>
	createSelector(
		[selectEntities, selectTvById(tvId)],
		(seasonEntities, movie) => {
			if (!movie) return null;

			const { seasons } = movie;

			if (!seasons) return null;

			return seasons?.map((seasonId) => seasonEntities[seasonId]);
		},
	),
);
