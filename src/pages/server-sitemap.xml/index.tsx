import { SITE_URL } from "@/constants/api";
import { generateUrlFromContent } from "@/lib/utils";
import { MovieModel, TvModel } from "@/redux/slices";
import { GetServerSideProps } from "next";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { RootState, wrapper } from "@/redux/store";
import { movieApi, tvApi } from "@/redux/services";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    // ========= Fetch top rated movies =========
    await store.dispatch(
      movieApi.endpoints.fetchTopRatedMovie.initiate({ page: 1 })
    );
    const movieState = (store.getState() as RootState).movie;
    const topRatedMovieIds = movieState.topRatedMovie.ids;
    const topRatedMoviesList = topRatedMovieIds
      .map((id: string) => movieState.entities[id])
      .map((movie: MovieModel) => ({
        loc: `${SITE_URL}${generateUrlFromContent({
          id: Number(movie.id),
          mediaType: "movie",
          title: movie.title,
        })}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.6,
      }));

    // ========= Fetch top rated tv series =========
    await store.dispatch(tvApi.endpoints.fetchTopRatedTv.initiate({ page: 1 }));
    const tvState = (store.getState() as RootState).tv;
    const topRatedTvIds = tvState.topRatedTv.ids;
    const topRatedTvList = topRatedTvIds
      .map((id: string) => tvState.entities[id])
      .map((tv: TvModel) => ({
        loc: `${SITE_URL}${generateUrlFromContent({
          id: Number(tv.id),
          mediaType: "tv",
          title: tv.name,
        })}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.6,
      }));

    // ========================= XML Generation =========================
    const fields = [...topRatedMoviesList, ...topRatedTvList];

    return getServerSideSitemapLegacy(ctx, fields);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) satisfies GetServerSideProps<any>;

export default function Sitemap() {}
