import { Provider } from "react-redux";
import { store } from "redux_/store";
import { Provider as AuthProvider } from "next-auth/client";
import Layout from "@comp/utils/Layout";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
