import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
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

export interface AuthForgottenPasswordState {
  viewState: ViewState<boolean>
}

const initialState: AuthForgottenPasswordState = {
  viewState: initialViewState(),
}

export const authForgottenPasswordReducer = (
  state: AuthForgottenPasswordState = initialState,
  action: AnyAction,
): AuthForgottenPasswordState => {
  switch (action.type) {
    case asStarted(AuthActionType.AUTH_FORGOTTEN_PASSWORD):
      return {
        ...state,
        viewState: startLoading<boolean>(state.viewState),
      }
    case asSuccess(AuthActionType.AUTH_FORGOTTEN_PASSWORD):
      return {
        ...state,
        viewState: withDomainResult<boolean>(state.viewState, action.result),
      }
    case asError(AuthActionType.AUTH_FORGOTTEN_PASSWORD):
      return {
        ...state,
        viewState: withDomainError<boolean>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
