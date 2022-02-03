import { connect } from "react-redux"
import AppContainerComponent from "./AppContainer.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AuthActionType } from "../auth/Auth.Epic"
import { AppContainerActionType } from "./AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.appContainer,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    navigateRoot: () => {
      dispatch(push("/"))
    },
    navigateServiceComponents: () => {
      dispatch(push("/service-components"))
    },
    navigateProduct: () => {
      dispatch(push("/products"))
    },
    navigateProfile: () => {
      dispatch(push("/profiles"))
    },
    navigateZevs: () => {
      dispatch(push("/zevs"))
    },
    navigateConnectionObjects: () => {
      dispatch(push("/buildings"))
    },
    navigateConsumptionPoints: () => {
      dispatch(push("/consumptionpoints"))
    },
    navigateContracts: () => {
      dispatch(push("/contracts"))
    },
    navigateBillingInitial: () => {
      dispatch(push("/billings/initial"))
    },
    navigateBillingRecurring: () => {
      dispatch(push("/billings/recurring"))
    },
    navigateTodoList: () => {
      dispatch(push("/tasklist"))
    },
    navigateMyProfile: () => {
      dispatch(push("/my-profile"))
    },
    navigateSettings: () => {
      dispatch(push("/settings"))
    },
    checkSession: () => {
      dispatch({
        type: AuthActionType.AUTH_REFRESH_SESSION,
      })
    },
    logout: (previousPathname?: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_LOGOUT,
        previousPathname: previousPathname,
      })
    },
    dialogAbortClick: () => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_HIDE,
      })
    },
    dialogConfirmClick: (action: AnyAction) => {
      dispatch(action)
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_HIDE,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainerComponent)
