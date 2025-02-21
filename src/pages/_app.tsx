import type { AppProps } from "next/app";
import "@/styles/index.scss";
import { wrapper } from "@/redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { useCanonical } from "@/lib/hooks";
import NextNProgress from "nextjs-progressbar";

/**
 Root App
 - I used next-redux-wrapper's wrapped store function. This is mainly to be able to hydrate server's redux state to client's redux state
 - I also included canonical url everytime the page route changes for better SEO ranking. (Details explained on useCanonical hooks)
 - I used nextjs-progressbar as it provide simple solution to display progress bar, preventing user from thinking the website is not responsive when switching page.
    -> If I have more time, I might create my own implementation. Because it mainly deals with nextjs's router event.
 - I used notranslate meta directive for google, just to prevent the website from being translated to retain its original meaning (movie & tvs)
    -> TMDB API only provide content in english, if they do provide other languages I might consider integrating locales in the website
 */
const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { url: canonicalUrl } = useCanonical();

  return (
    <>
      <Head>
        <meta content="notranslate" name="google" />
        <link href={canonicalUrl} rel="canonical" />
      </Head>

      <Provider store={store}>
        <NextNProgress color="#3c89fd" height={2} />
        <Component {...props} />
      </Provider>
    </>
  );
};

export default App;
