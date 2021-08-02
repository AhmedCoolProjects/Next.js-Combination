import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "@comp/utils/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
