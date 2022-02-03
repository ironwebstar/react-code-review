import { createTheme } from "@mui/material"

export const appThemePrimaryColor = "#BCCF02"
export const appThemeSecondaryColor = "#6c9c30"
export const appThemeWarningColor = "#ffa726"
export const appThemeWarningDarkColor = "#f57c00"
export const appThemeErrorColor = "#ec6a0a"
export const appThemeErrorDarkColor = "#de3f1a"

export const appTheme = createTheme({
  palette: {
    primary: {
      main: appThemePrimaryColor,
    },
    secondary: {
      main: appThemeSecondaryColor,
    },
    action: {
      disabled: "#888888",
    },
  },
})
