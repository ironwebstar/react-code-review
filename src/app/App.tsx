import { Provider, ReactReduxContext } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { I18nextProvider } from "react-i18next"
import AppContainerConnect from "./appcontainer/AppContainer.Connect"
import { appStore } from "./App.Store"
import { history } from "./App.Reducer"
import { setupI18N } from "./App.i18n"
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { ThemeProvider } from "@mui/material"
import { appTheme } from "./Shared.Theme"

export const App = () => (
  <Provider store={appStore} context={ReactReduxContext}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <I18nextProvider i18n={setupI18N()}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <ThemeProvider theme={appTheme}>
            <AppContainerConnect />
          </ThemeProvider>
        </ConnectedRouter>
      </I18nextProvider>
    </LocalizationProvider>
  </Provider>
)
