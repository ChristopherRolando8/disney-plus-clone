import { PageLayout } from "@/ui/layouts";
import styles from "./tv-series-detail-main.module.scss";
import { TvSeriesDetailMainProps } from "./tv-series-detail-main.type";
import Head from "next/head";
import { useAppSelector } from "@/redux/store";
import * as SL from "@/redux/slices";
import * as C from "@/ui/components";
import { tabs } from "./tv-series-detail-main.constant";
import { useEffect, useMemo, useState } from "react";
import { CardEpisodesWrapper, CardTvWrapper } from "@/ui/components-wrapper";
import { usePopulateWatchlist, useWatchlistStorage } from "@/lib/hooks";

const TvSeriesDetailMain: React.FC<TvSeriesDetailMainProps> = (props) => {
  const {
    data: { tvDetail, tvRecommendationIds },
  } = props;

  const { loading } = usePopulateWatchlist();

  const tvGenres = useAppSelector(SL.selectTvGenresByTvId(Number(tvDetail.id)));
  const tvSeasons = useAppSelector(
    SL.selectTvSeasonsByTvId(Number(tvDetail.id))
  );

  const seasonTabs = useMemo<C.TabItem[]>(() => {
    if (!tvSeasons) return [];

    return tvSeasons
      .filter((season) => season.season_number !== 0)
      .map((season) => ({
        id: season.id,
        value: String(season.season_number),
        label: season.name,
      }));
  }, [tvSeasons]);

  const title = useMemo(() => {
    const tvGenreString = tvGenres?.map((item) => item.name);

    return `${tvDetail.name}, ${tvGenreString?.join(
      " "
    )} TV Series - Watch All Latest Episodes Online on Disney+ Hotstar`;
  }, [tvGenres, tvDetail]);

  const [tabValue, setTabValue] = useState(tabs[0].value);
  const [seasonTabValue, setSeasonTabValue] = useState(
    seasonTabs[0]?.value || ""
  );

  useEffect(() => {
    setTabValue(tabs[0].value);
  }, []);

  useEffect(() => {
    setSeasonTabValue(seasonTabs[0]?.value || "");
  }, [tabValue, seasonTabs]);

  useEffect(() => {
    setSeasonTabValue(seasonTabs[0]?.value || "");
  }, [seasonTabs]);

  const {
    handlers: { onAddToWatchlist, onRemoveFromWatchlist },
    state: { isInWatchlist },
  } = useWatchlistStorage({
    currentWatchlistDetail: {
      id: `tv${tvDetail.id}`,
      mediaType: "tv",
      mediaId: Number(tvDetail.id),
    },
  });

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta content={title} name="title" />
        <meta content={tvDetail.overview} name="description" />
      </Head>

      <PageLayout>
        <div className={styles.tvSeriesDetailMainRoot}>
          <C.HeroContentTv
            id={tvDetail.id}
            title={tvDetail.name}
            overview={tvDetail.overview}
            backdropUrl={tvDetail.backdrop_path}
            genres={tvGenres || []}
            language={tvDetail.original_language}
            airDate={tvDetail.first_air_date}
            numberOfSeasons={seasonTabs.length}
            loadingButton={loading}
            isInWatchlist={isInWatchlist}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
          />

          <div className={styles.tabContainer}>
            <C.Tabs tabs={tabs} value={tabValue} onChange={setTabValue} />
          </div>

          <C.TabPanel value="episodes" currentValue={tabValue}>
            <C.Tabs
              useBorder={false}
              tabs={seasonTabs}
              value={seasonTabValue}
              onChange={setSeasonTabValue}
            />

            <div className={styles.seasonTabContainer}>
              {seasonTabs.map((season) => {
                return (
                  <C.TabPanel
                    key={season.id}
                    value={season.value}
                    currentValue={seasonTabValue}
                  >
                    <div className={styles.episodeContainer}>
                      <CardEpisodesWrapper
                        seasonId={Number(season.id)}
                        seasonNumber={Number(season.value)}
                        tvSeriesId={Number(tvDetail.id)}
                      />
                    </div>
                  </C.TabPanel>
                );
              })}
            </div>
          </C.TabPanel>

          <C.TabPanel value="more-like-this" currentValue={tabValue}>
            <div className={styles.cardContainer}>
              <C.CardCarousel>
                {tvRecommendationIds.map((id) => {
                  return (
                    <div key={id} className={styles.cardWrapper}>
                      <CardTvWrapper id={Number(id)} mediaType="tv" />
                    </div>
                  );
                })}
              </C.CardCarousel>
            </div>
          </C.TabPanel>
        </div>
      </PageLayout>
    </>
  );
};

export default TvSeriesDetailMain;
