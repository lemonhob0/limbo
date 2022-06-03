import { useRouter } from "next/router";
import Loading from "./loading";
import Nav from "./nav";
import Head from "next/head";

export default function Layout({ children }) {
  const router = useRouter();
  const navDisplay = router.asPath === "/";
  const { mod, unit } = router.query;
  return (
    <>
      <Head>
        <meta name="theme-color" content="#18191a"></meta>
        <link rel="icon" href="logo.svg"></link>
        <title>
          {navDisplay
            ? "authentication - Vertualcubes"
            : unit || mod || "Vertualcubes"}
        </title>
      </Head>

      {!navDisplay && router.route !== "/embed/[vd]" && <Nav />}
      {router.route !== "/embed/[vd]" && <Loading />}
      {children}
    </>
  );
}
