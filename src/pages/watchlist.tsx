import { WatchlistMain } from "@/ui/pages/watchlist";
import React from "react";

/**
 Watchlist
	- SSR Content:
		n/a (because local storage is stored on client side, we can't do any SSR)

 - NoSSR Content:
     1. The lists of user's watchlist
 */

const Watchlist: React.FC = () => {
  return <WatchlistMain />;
};

export default Watchlist;
