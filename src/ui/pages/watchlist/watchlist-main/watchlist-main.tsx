import { PageLayout } from "@/ui/layouts";
import styles from "./watchlist-main.module.scss";
import Head from "next/head";
import { Meta } from "@/constants/meta";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import * as SL from "@/redux/slices";
import * as C from "@/ui/components";
import { CardMovieWrapper, CardTvWrapper } from "@/ui/components-wrapper";
import { useDebounce, usePopulateWatchlist } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/constants/icon";
import { useState } from "react";
import { WatchlistVarName } from "@/constants/local-storage";

const WatchlistMain: React.FC = () => {
  const { loading } = usePopulateWatchlist();

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<C.CardContentProps["mode"]>("default");

  const debouncedSearch = useDebounce(search, 700);

  const watchlists: SL.Watchlist[] = useAppSelector(
    SL.selectWatchlistsByTitle(debouncedSearch)
  );

  const onBulkDeleteClick = () => {
    setMode("select");
  };

  const filteredWatchlists = useAppSelector(SL.selectFilteredWatchlist);
  const dispatch = useAppDispatch();

  const onDeleteClick = () => {
    dispatch(SL.setWatchlist(filteredWatchlists));
    localStorage.setItem(WatchlistVarName, JSON.stringify(filteredWatchlists));
  };

  const onCancelClick = () => {
    dispatch(SL.setToBeDeletedWatchlist([]));
    setMode("default");
  };

  return (
    <>
      <Head>
        <title>{Meta.watchlist.title}</title>

        <meta content={Meta.watchlist.title} name="title" />
        <meta content={Meta.watchlist.description} name="description" />
      </Head>

      <PageLayout>
        <div className={styles.watchlistMainRoot}>
          <div className={styles.titleWrapper}>
            <h1 className={clsx("font-h1", styles.titleText)}>Watchlist</h1>
          </div>

          <div className={styles.searchFieldWrapper}>
            <C.SearchField
              value={search}
              onChange={setSearch}
              placeholder="Search your watchlist"
            />
          </div>

          <C.RenderIf isTrue={watchlists.length > 0}>
            <div className={styles.bulkDeleteWrapper}>
              <C.RenderIf isTrue={mode === "default"}>
                <C.Button
                  className={styles.bulkDeleteButton}
                  onClick={onBulkDeleteClick}
                >
                  <p className="font-p">Bulk Delete</p>
                </C.Button>
              </C.RenderIf>

              <C.RenderIf isTrue={mode === "select"}>
                <p className={clsx("font-p", styles.detailSelectText)}>
                  Please select the content
                </p>

                <C.Button
                  className={styles.deleteButton}
                  onClick={onDeleteClick}
                >
                  <p className="font-p">Delete Selected</p>
                </C.Button>

                <C.Button
                  className={styles.cancelButton}
                  onClick={onCancelClick}
                >
                  <p className="font-p">Cancel</p>
                </C.Button>
              </C.RenderIf>
            </div>
          </C.RenderIf>

          <div className={styles.cardGridWrapper}>
            <C.RenderIf isTrue={loading}>
              <C.CardGrid title="">
                {Array.from(Array(20).keys()).map((idx) => {
                  return (
                    <div key={idx} className={styles.cardWrapper}>
                      <C.CardContent
                        id={idx}
                        backdropUrl=""
                        mediaType="movie"
                        overview=""
                        posterUrl=""
                        title=""
                        loading
                      />
                    </div>
                  );
                })}
              </C.CardGrid>
            </C.RenderIf>

            <C.RenderIf isTrue={!loading}>
              <C.RenderIf isTrue={watchlists.length === 0}>
                <div className={styles.noResultContainer}>
                  <div className={styles.noResultImageContainer}>
                    <Image alt="Empty watchlist" src={Icon.NoResult} />
                  </div>

                  <h1 className={clsx(styles.noResultText, "font-h1")}>
                    No watchlist found
                  </h1>

                  <h2 className={clsx(styles.noResultDetailText, "font-h2")}>
                    Try{" "}
                    <Link href="/search" passHref>
                      <span className={styles.searchTextCTA}>searching</span>
                    </Link>{" "}
                    for content and adding it to your watchlist
                  </h2>
                </div>
              </C.RenderIf>

              <C.RenderIf isTrue={watchlists.length > 0}>
                <C.CardGrid>
                  {watchlists.map((item) => {
                    if (item.mediaType === "movie") {
                      return (
                        <div key={item.id} className={styles.cardWrapper}>
                          <CardMovieWrapper
                            id={Number(item.mediaId)}
                            mediaType="movie"
                            mode={mode}
                          />
                        </div>
                      );
                    } else if (item.mediaType === "tv") {
                      return (
                        <div key={item.id} className={styles.cardWrapper}>
                          <CardTvWrapper
                            id={Number(item.mediaId)}
                            mediaType="tv"
                            mode={mode}
                          />
                        </div>
                      );
                    }

                    return null;
                  })}
                </C.CardGrid>
              </C.RenderIf>
            </C.RenderIf>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default WatchlistMain;
