import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { useMemo, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";
import { useRouter } from "next/router";
import { colors } from "./ThemesColors";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, selectIsDarkMode } from "redux_/slices/modeSlice";

function Layout({ children }) {
  const isDark = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const isDarkStorage = localStorage.getItem("is-dark-storage");
    if (isDarkStorage === "false") dispatch(changeMode());
  }, []);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: isDark ? "dark" : "light",
          primary: colors.primary,
          secondary: colors.secondary,
        },
      }),
    [isDark]
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
