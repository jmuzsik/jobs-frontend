import Layout from "../components/Layout";

// where almost all styles are fetched - some are within css/scss file in ../styles
import "normalize.css/normalize.css";
import "../styles/overrides.scss";
import "../styles/globals.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "../styles/Hero.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
