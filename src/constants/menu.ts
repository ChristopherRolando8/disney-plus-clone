import { StaticImageData } from "next/image";
import { Icon } from "./icon";

export interface MenuItem {
  icon: StaticImageData;
  title: string;
  url: string;
}

export const Menus: MenuItem[] = [
  { icon: Icon.Search, title: "Search", url: "/search" },
  { icon: Icon.Home, title: "Home", url: "/" },
  { icon: Icon.Watchlist, title: "Watchlist", url: "/watchlist" },
];
