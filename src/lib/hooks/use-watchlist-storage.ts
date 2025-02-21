import { Watchlist } from "@/redux/slices";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import * as SL from "@/redux/slices";
import { useMemo } from "react";
import { WatchlistVarName } from "@/constants/local-storage";

// ? Hooks to handle adding and removing from watchlist, the input is the watchlist in question
// ? When adding/removing, set local storage and also update the redux state.
const useWatchlistStorage = ({
  currentWatchlistDetail,
}: {
  currentWatchlistDetail: Watchlist;
}) => {
  const { id } = currentWatchlistDetail;

  const dispatch = useAppDispatch();

  const currentWatchlist: SL.Watchlist[] = useAppSelector(
    SL.selectAllWatchlists
  );

  const handleAddToWatchlist = () => {
    dispatch(SL.insertToWatchlist(currentWatchlistDetail));

    const newWatchlists = [currentWatchlistDetail, ...currentWatchlist];
    localStorage.setItem(WatchlistVarName, JSON.stringify(newWatchlists));
  };

  const handleRemoveFromWatchlist = () => {
    dispatch(SL.removeFromWatchlist(currentWatchlistDetail));

    const newWatchlists = currentWatchlist.filter((item) => item.id !== id);
    localStorage.setItem(WatchlistVarName, JSON.stringify(newWatchlists));
  };

  const isInWatchlist = useMemo(
    () => !!currentWatchlist.find((item) => item.id === id),
    [currentWatchlist, id]
  );

  return {
    handlers: {
      onAddToWatchlist: handleAddToWatchlist,
      onRemoveFromWatchlist: handleRemoveFromWatchlist,
    },
    state: {
      isInWatchlist,
    },
  };
};

export default useWatchlistStorage;
