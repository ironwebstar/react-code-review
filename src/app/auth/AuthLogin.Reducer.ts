import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  withDomainError,
  ViewState,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { AuthActionType } from "./Auth.Epic"

export interface AuthState {
  viewState: ViewState<boolean>
  previousPathname?: string
}

const initialState: AuthState = {
  viewState: initialViewState(),
}

export const authLoginReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case asStarted(AuthActionType.AUTH_CREATE_SESSION):
      return {
        ...state,
        viewState: startLoading<boolean>(state.viewState),
      }
    case asSuccess(AuthActionType.AUTH_REFRESH_SESSION):
    case asSuccess(AuthActionType.AUTH_CREATE_SESSION):
      return {
        ...initialState,
        viewState: withDomainResult(state.viewState, action.result),
        previousPathname: state.previousPathname,
      }
    case asError(AuthActionType.AUTH_CREATE_SESSION):
      return {
        ...state,
        viewState: withDomainError<boolean>(state.viewState, action.result),
      }
    case asError(AuthActionType.AUTH_REFRESH_SESSION):
      return {
        ...initialState,
        previousPathname: state.previousPathname,
      }
    case asSuccess(AppContainerActionType.APP_CONTAINER_LOGOUT):
      return {
        ...state,
        previousPathname: action.previousPathname !== "/signin" ? action.previousPathname : action.previousPathname,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        previousPathname: action.payload.location.pathname === "/signin" ? state.previousPathname : undefined,
      }
    default:
      return {
        ...state,
      }
  }
}
