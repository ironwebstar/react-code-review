import { useEffect } from "react"
import { RouteComponentProps, Switch, Route, withRouter, Redirect } from "react-router-dom"
import { AppContainerState } from "./AppContainer.Reducer"
import AuthLoginConnect from "../auth/AuthLogin.Connect"
import AuthForgottenPasswordConnect from "../auth/AuthForgottenPassword.Connect"
import { firstViewState, ViewState } from "../Shared.Reducer"
import { AppHeaderView, AppHeaderViewProps } from "./views/AppHeaderView"
import { AppNavigationView, AppNavigationViewProps } from "./views/AppNavigationView"
import { AppContainerView } from "./views/AppContainerView"
import { AppPageView } from "./views/AppPageView"
import { AppConfirmDialog } from "./views/AppConfirmDialog"
import { AppRouteParams, AppRoutes } from "../App.Routes"
import AuthNewAccountPasswordConnect from "../auth/AuthNewAccountPassword.Connect"
import { AppBackButton } from "./views/AppBackButton"
import { mapDispatchToProps } from "./AppContainer.Connect"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"

export interface AppContainerComponentProps
  extends AppContainerState,
    AppNavigationViewProps,
    AppHeaderViewProps,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export default withRouter((props: AppContainerComponentProps) => {
  const {
    appConfirmDialogState: appConfirmDialog,
    dialogAbortClick,
    dialogConfirmClick,
    sessionExpired,
    location,
    logout,
  } = props
  useEffect(() => {
    if (sessionExpired) {
      logout(location.pathname)
    }
  }, [sessionExpired])
  return (
    <>
      <Switch>
        <Route path="/signin" component={AuthLoginConnect} />
        <Route path="/reset-password" component={AuthForgottenPasswordConnect} />
        <Route path="/session/help/new-account-password" component={AuthNewAccountPasswordConnect} />
        <AuthGuard {...props}>
          <AuthenticatedRoutes {...props} />
        </AuthGuard>
      </Switch>
      {appConfirmDialog && (
        <AppConfirmDialog
          appConfirmDialog={appConfirmDialog}
          dialogAbortClick={dialogAbortClick}
          dialogConfirmClick={() => appConfirmDialog && dialogConfirmClick(appConfirmDialog.nextAction)}
        />
      )}
    </>
  )
})

const AuthenticatedRoutes = (
  props: AppNavigationViewProps & AppHeaderViewProps & RouteComponentProps<AppRouteParams>,
) => (
  <>
    <AppHeaderView {...props} />
    <AppContainerView>
      <AppNavigationView {...props} />
      <AppPageView>
        <AppBackButton />
        <AppRoutes />
      </AppPageView>
    </AppContainerView>
  </>
)

export const AuthGuard = (props: {
  viewState: ViewState<boolean>
  children: React.ReactNode
  checkSession: () => void
}) => {
  const { viewState, checkSession, children } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      checkSession()
    }
  }, [viewState])
  if (viewState.isLoading) return <ProgressIndicator />
  if (viewState.domainError) return <Redirect to="/signin" />
  return <>{children}</>
}
