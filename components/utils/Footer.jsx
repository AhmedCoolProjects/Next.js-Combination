import { Link, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "redux_/slices/modeSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link target="blank_" color="inherit" href="https://ahmedbargady.me">
        Jina Cool Projects
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  const isDark = useSelector(selectIsDarkMode);
  return (
    <footer
      className={
        isDark ? "mt-12 p-12 bg-[#424242]" : "mt-12 p-12 bg-[#eeeeee]"
      }>
      <Typography
        color="textSecondary"
        variant="h6"
        align="center"
        gutterBottom>
        Created with ❤️ By:
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p">
        Ahmed BARGADY
      </Typography>
      <Copyright />
    </footer>
  );
}

export default Footer;
