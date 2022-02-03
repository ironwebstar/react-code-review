import { AnyAction } from "redux"
import { AuthActionType } from "../auth/Auth.Epic"
import {
  asStarted,
  startLoading,
  asSuccess,
  asError,
  withDomainError,
  ViewState,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { AppContainerActionType } from "./AppContainer.Epic"
import { AppConfirmDialogState } from "./views/AppConfirmDialog"

export interface AppContainerState {
  viewState: ViewState<boolean>
  appConfirmDialogState?: AppConfirmDialogState
  sessionExpired: boolean
}

export const initialState: AppContainerState = {
  viewState: initialViewState(),
  sessionExpired: false,
}

export const appContainerReducer = (state: AppContainerState = initialState, action: AnyAction): AppContainerState => {
  switch (action.type) {
    case asStarted(AuthActionType.AUTH_REFRESH_SESSION):
      return {
        ...state,
        viewState: startLoading(state.viewState),
      }
    case asSuccess(AuthActionType.AUTH_CREATE_SESSION):
    case asSuccess(AuthActionType.AUTH_REFRESH_SESSION):
      return {
        ...state,
        viewState: withDomainResult(state.viewState, action.result),
      }

    case asError(AuthActionType.AUTH_CREATE_SESSION):
    case asError(AuthActionType.AUTH_REFRESH_SESSION):
      return {
        ...state,
        viewState: withDomainError(state.viewState, action.result),
      }
    case AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW:
      return {
        ...state,
        appConfirmDialogState: {
          dialogBody: action.dialogBody,
          dialogCta: action.dialogCta,
          nextAction: action.nextAction,
        },
      }
    case AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_HIDE:
      return {
        ...state,
        appConfirmDialogState: undefined,
      }
    case AppContainerActionType.APP_CONTAINER_LOGOUT:
      return initialState
    default:
      return {
        ...state,
        sessionExpired: action.type.endsWith("SESSION_EXPIRED"),
      }
  }
}
