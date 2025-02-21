import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { tvAdapter } from './tv.slice';
import memoize from 'lodash/memoize';

const selectTv = (state: RootState) => state.tv;

export const { selectEntities: selectTvEntities, selectAll: selectAllTv } =
	tvAdapter.getSelectors<RootState>((state) => state.tv);

export const selectAllTvs = createSelector(selectAllTv, (tv) => tv);

export const selectAllTopRatedTvs = createSelector(
	selectTv,
	(tv) => tv.topRatedTv.ids,
);

export const selectAllSimilarTvs = createSelector(
	selectTv,
	(tv) => tv.similarTv.ids,
);

export const selectTvById = memoize((tvId?: number) =>
	createSelector(
		selectTvEntities,
		(tvEntities) => tvEntities[tvId || ''] || null,
	),
);
