import { createTheme } from "@mui/material";
import typography from "./Tyography";
import ComponentsOverrides from "./components";

export const mainColor = {
  primary: "#FFFFFF",

  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  white: "#FFFFFF",
  black: "#000000",
};

export const themeOptions: any = {
  palette: {
    mode: "light",
    primary: {
      main: mainColor.primary,
      white: mainColor.white,
    },
    gray: {
      50: mainColor.gray50,
      100: mainColor.gray100,
      200: mainColor.gray200,
      300: mainColor.gray300,
      400: mainColor.gray400,
      500: mainColor.gray500,
      600: mainColor.gray600,
      700: mainColor.gray700,
      800: mainColor.gray800,
      900: mainColor.gray900,
    },
  },
  typography,
};

const theme = createTheme(themeOptions);
theme.components = ComponentsOverrides(theme);

export default theme;
