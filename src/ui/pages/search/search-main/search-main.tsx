import { PageLayout } from "@/ui/layouts";
import styles from "./search-main.module.scss";
import { SearchMainProps } from "./search-main.type";
import { CardMovieWrapper, CardTvWrapper } from "@/ui/components-wrapper";
import Head from "next/head";
import { Meta } from "@/constants/meta";
import { CardContent, CardGrid, RenderIf, SearchField } from "@/ui/components";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks";
import { useMultiSearchQuery } from "@/redux/services";
import { useAppSelector } from "@/redux/store";
import { selectSearchedMovieIds, selectSearchedTvIds } from "@/redux/slices";
import Image from "next/image";
import clsx from "clsx";
import { Icon } from "@/constants/icon";

const SearchMain: React.FC<SearchMainProps> = (props) => {
  const { data } = props;

  const { discoverMovieIds, discoverTvSeriesIds } = data;

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 700);

  const { isFetching } = useMultiSearchQuery(
    { page: 1, query: debouncedSearch },
    { refetchOnMountOrArgChange: true, skip: !search }
  );

  const searchedMovieIds = useAppSelector(selectSearchedMovieIds);
  const searchedTvIds = useAppSelector(selectSearchedTvIds);

  return (
    <>
      <Head>
        <title>{Meta.search.title}</title>

        <meta content={Meta.search.title} name="title" />
        <meta content={Meta.search.description} name="description" />
      </Head>

      <PageLayout>
        <div className={styles.searchMainRoot}>
          <div className={styles.searchFieldWrapper}>
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder="Movies, shows and more"
            />
          </div>

          <div className={styles.cardGridWrapper}>
            <RenderIf isTrue={!debouncedSearch}>
              <CardGrid title="Popular Searches">
                {discoverMovieIds.map((id) => {
                  return (
                    <div key={id} className={styles.cardWrapper}>
                      <CardMovieWrapper id={Number(id)} mediaType="movie" />
                    </div>
                  );
                })}

                {discoverTvSeriesIds.map((id) => {
                  return (
                    <div key={id} className={styles.cardWrapper}>
                      <CardTvWrapper id={Number(id)} mediaType="tv" />
                    </div>
                  );
                })}
              </CardGrid>
            </RenderIf>

            <RenderIf isTrue={!!debouncedSearch}>
              <RenderIf isTrue={isFetching}>
                <CardGrid title="">
                  {Array.from(Array(30).keys()).map((idx) => {
                    return (
                      <div key={idx} className={styles.cardWrapper}>
                        <CardContent
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
                </CardGrid>
              </RenderIf>

              <RenderIf isTrue={!isFetching}>
                <RenderIf isTrue={searchedMovieIds.length > 0}>
                  <CardGrid title="Movies">
                    {searchedMovieIds.map((id: string) => {
                      return (
                        <div key={id} className={styles.cardWrapper}>
                          <CardMovieWrapper id={Number(id)} mediaType="movie" />
                        </div>
                      );
                    })}
                  </CardGrid>
                </RenderIf>

                <RenderIf isTrue={searchedTvIds.length > 0}>
                  <CardGrid title="TV Series">
                    {searchedTvIds.map((id: string) => {
                      return (
                        <div key={id} className={styles.cardWrapper}>
                          <CardTvWrapper id={Number(id)} mediaType="tv" />
                        </div>
                      );
                    })}
                  </CardGrid>
                </RenderIf>

                <RenderIf
                  isTrue={!searchedMovieIds.length && !searchedTvIds.length}
                >
                  <div className={styles.noResultContainer}>
                    <div className={styles.noResultImageContainer}>
                      <Image alt="Empty search results" src={Icon.NoResult} />
                    </div>

                    <h1 className={clsx(styles.noResultText, "font-h1")}>
                      {`Couldn't find "${debouncedSearch}"`}
                    </h1>

                    <h2 className={clsx(styles.noResultDetailText, "font-h2")}>
                      Try searching for something else or try with a different
                      spelling
                    </h2>
                  </div>
                </RenderIf>
              </RenderIf>
            </RenderIf>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default SearchMain;
