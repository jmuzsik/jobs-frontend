import { useRouter } from "next/router";

import Layout from "../components/Layout";
import useUnload from "../hooks/useUnload";

import "normalize.css/normalize.css";
import "../styles/overrides.scss";
import "../styles/globals.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "../styles/Hero.scss";

function removeQueryParams(router) {
  console.log(JSON.stringify(router))
  if (Object.keys(router.query).length > 0) {
    router.push(router.pathname, null, { shallow: true });
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // useUnload((e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  //   removeQueryParams(router);
  // });
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
