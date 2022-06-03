import "@styles/globals.scss";
import Layout from "components/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
const client = new ApolloClient({
  uri: "https://mera7.herokuapp.com/",
  cache: new InMemoryCache()
});

export const MyCookie = createContext();

function MyApp({ Component, pageProps }) {
  const [cookie, setCookie] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const c = document.cookie
      .split(";")
      .map(e => e.split("="))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key.trim()]: decodeURIComponent(value)
        }),
        {}
      );

    if (c.uid) {
      setCookie(c);
    } else router.replace("/");
  }, []);

  return (
    <ApolloProvider client={client}>
      <MyCookie.Provider value={cookie}>
        <Layout>
          {router.route !== "/embed/[vd]" && (
            <NextNProgress
              color="#0569c7"
              height={2}
              options={{ showSpinner: false }}
            />
          )}
          <Component {...pageProps} />
        </Layout>
      </MyCookie.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
