import { WatchlistVarName } from "@/constants/local-storage";
import { setWatchlist } from "@/redux/slices";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";

// Hooks to handle populating watchlist from localStorage to redux state
// Every mount:
//  - If there is no watchlist in storage, create an empty array
//  - If there is already one, set the redux state
const usePopulateWatchlist = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawWatchlist = localStorage.getItem(WatchlistVarName) || "";

    if (!rawWatchlist) {
      localStorage.setItem(WatchlistVarName, JSON.stringify([]));
      setLoading(false);
      return;
    }

    try {
      const parsedWatchlist = JSON.parse(rawWatchlist);

      if (!Array.isArray(parsedWatchlist)) {
        localStorage.setItem(WatchlistVarName, JSON.stringify([]));
        setLoading(false);
      } else {
        dispatch(setWatchlist(parsedWatchlist));
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      localStorage.setItem(WatchlistVarName, JSON.stringify([]));
      setLoading(false);
    }
  }, [dispatch]);

  return { loading };
};

export default usePopulateWatchlist;
