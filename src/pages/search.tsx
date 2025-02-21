import { discoverApi } from "@/redux/services";
import { wrapper } from "@/redux/store";
import { SearchMain } from "@/ui/pages/search";
import { GetServerSideProps } from "next";

export interface SearchSSRProps {
  discoverMovieIds: string[];
  discoverTvSeriesIds: string[];
}

/**
 Search Page
	- SSR Content:
			1. Discover new movies (assuming its popular searches)
			2. Discover new TV series (assuming its popular searches)

 - NoSSR Content:
     1. The search resuts
						-> because it is based on user input in client side

 */
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // ========= Discover movies =========
    await store.dispatch(
      discoverApi.endpoints.fetchDiscoverMovie.initiate({ page: 1 })
    );

    const movieDiscoverState = store.getState().discover;
    const discoverMovieIds = movieDiscoverState.discoverMovieIds;

    // ========= Discover TV series =========
    await store.dispatch(
      discoverApi.endpoints.fetchDiscoverTv.initiate({ page: 1 })
    );

    const tvSeriesDiscoverState = store.getState().discover;
    const discoverTvSeriesIds = tvSeriesDiscoverState.discoverTvIds;

    return {
      props: {
        discoverMovieIds,
        discoverTvSeriesIds,
      },
    };
  }
) satisfies GetServerSideProps<SearchSSRProps>;

const Search = ({ pageProps }: { pageProps: SearchSSRProps }) => {
  return <SearchMain data={pageProps} />;
};

export default Search;
