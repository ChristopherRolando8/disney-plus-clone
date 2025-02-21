import { movieApi } from "@/redux/services";
import { MovieModel } from "@/redux/slices";
import { wrapper } from "@/redux/store";
import { MovieDetailMain } from "@/ui/pages/movie-detail";
import { GetServerSideProps } from "next";

export interface MovieDetailSSRProps {
  movieDetail: Omit<MovieModel, "poster_path">; // poster_path is not needed as only backdrop path is shown in this page
  movieRecommendationIds: string[];
}

/**
Movie Detail Page
	- SSR Content:
			1. The detail of the movie
			2. List of similar/recommended movies
				-> to reduce size, only the IDs is sent to client, will populate on client when state is hydrated from redux
  - NoSSR Content:
 	     n/a

 */
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { slug } = params as { slug: string[] };
      const movieId = slug[1];

      // ========= Movie Detail =========
      await store.dispatch(
        movieApi.endpoints.fetchMovieDetailById.initiate({
          id: movieId,
          append_to_response: "genres",
        })
      );

      const movieStateEntities = store.getState().movie.entities;
      const movieDetail: MovieModel = movieStateEntities[movieId];

      // ========= Movie Recommendations =========
      await store.dispatch(
        movieApi.endpoints.fetchSimilarMovieById.initiate({
          id: movieId,
          page: 1,
        })
      );

      const recommendedMovieStateEntities = store.getState().movie.similarMovie;
      const movieRecommendationIds = recommendedMovieStateEntities.ids;

      const {
        id,
        backdrop_path,
        title,
        original_language,
        overview,
        release_date,
        runtime,
      } = movieDetail;

      return {
        props: {
          movieDetail: {
            id,
            backdrop_path,
            title,
            original_language,
            overview,
            release_date,
            runtime,
          },
          movieRecommendationIds,
        },
      };
    }
) satisfies GetServerSideProps<MovieDetailSSRProps>;

const MovieDetail = ({ pageProps }: { pageProps: MovieDetailSSRProps }) => {
  return <MovieDetailMain data={pageProps} />;
};

export default MovieDetail;
