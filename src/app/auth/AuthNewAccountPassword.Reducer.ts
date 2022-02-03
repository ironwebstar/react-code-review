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

export interface AuthNewAccountPasswordState {
  viewState: ViewState<boolean>
}

const initialState: AuthNewAccountPasswordState = {
  viewState: initialViewState(),
}

export const authNewAccountPasswordReducer = (
  state: AuthNewAccountPasswordState = initialState,
  action: AnyAction,
): AuthNewAccountPasswordState => {
  switch (action.type) {
    case asStarted(AuthActionType.AUTH_NEW_ACCOUNT_PASSWORD):
      return {
        ...state,
        viewState: startLoading<boolean>(state.viewState),
      }
    case asSuccess(AuthActionType.AUTH_NEW_ACCOUNT_PASSWORD):
      return {
        ...state,
        viewState: withDomainResult<boolean>(state.viewState, action.result),
      }
    case asError(AuthActionType.AUTH_NEW_ACCOUNT_PASSWORD):
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
