import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { useMemo } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";
import { useRouter } from "next/router";
import { colors } from "./ThemesColors";

function Layout({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: colors.primary,
          secondary: colors.secondary,
        },
      }),
    [prefersDarkMode]
  );
  const router = useRouter();
  const { pathname } = router;
  const isLogin = pathname === "/login";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {isLogin ? null : <TopNavbar />}
        {children}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
