import { Roboto } from "next/font/google";

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

type ResponsiveFontSizesProps = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

export function responsiveFontSizes({
  xs,
  sm,
  md,
  lg,
}: ResponsiveFontSizesProps) {
  return {
    "@media (min-width:0px)": {
      fontSize: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const typography = {
  fontFamily: roboto.style.fontFamily,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ xs: 10, sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 10, sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 10, sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 18, sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 10, sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 20, lg: 20 }),
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 16, md: 16, lg: 16 }),
  },
  subtitle2: {
    fontWeight: 500,
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 14, lg: 14 }),
  },
  body1: {
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 14, lg: 16 }),
  },
};

export default typography;
