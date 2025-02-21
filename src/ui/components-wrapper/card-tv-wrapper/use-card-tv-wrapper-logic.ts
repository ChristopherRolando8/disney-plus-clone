import * as SR from "@/redux/services";
import * as SL from "@/redux/slices";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CardContentProps } from "@/ui/components/card-content";
import { useMemo } from "react";
import { CardTvWrapperProps } from "./card-tv-wrapper.type";

export const useCardTvWrapperLogic = ({
  currentWatchlistDetail,
  mode,
}: {
  currentWatchlistDetail: SL.Watchlist;
  mode: CardTvWrapperProps["mode"];
}) => {
  const tvDetail = useAppSelector(
    SL.selectTvById(currentWatchlistDetail.mediaId)
  );
  const toBeDeletedWatchlists = useAppSelector(SL.selectToBeDeletedWatchlists);

  const { isFetching } = SR.useFetchTvDetailByIdQuery(
    { id: String(currentWatchlistDetail.mediaId) },
    { skip: !!tvDetail }
  );

  const dispatch = useAppDispatch();

  const handleSelect: CardContentProps["onSelect"] = (reason) => {
    if (reason === "add") {
      dispatch(SL.insertToBeDeletedWatchlist(currentWatchlistDetail));
    }

    if (reason === "remove") {
      dispatch(SL.removeFromToBeDeletedWatchlist(currentWatchlistDetail));
    }
  };

  const isSelected = useMemo(() => {
    if (mode === "default") return false;

    return !!toBeDeletedWatchlists.find(
      (watchlist: SL.Watchlist) => watchlist.id === currentWatchlistDetail.id
    );
  }, [mode, toBeDeletedWatchlists, currentWatchlistDetail]);

  return {
    handlers: { onSelectCard: handleSelect },
    state: { isSelected, tvDetail, isFetching },
  };
};
