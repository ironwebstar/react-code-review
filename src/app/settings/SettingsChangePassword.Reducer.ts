import { AnyAction } from "redux"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { LOCATION_CHANGE } from "connected-react-router"
import { SettingsActionType } from "./Settings.Epic"

export interface SettingsChangePasswordState {
  viewState: ViewState<boolean>
}

const initialState: SettingsChangePasswordState = {
  viewState: initialViewState(),
}

export const settingsChangePasswordReducer = (state: SettingsChangePasswordState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(SettingsActionType.SETTINGS_CHANGE_PASSWORD):
      return {
        ...state,
        viewState: startLoading<boolean>(state.viewState),
      }
    case asSuccess(SettingsActionType.SETTINGS_CHANGE_PASSWORD):
      return {
        ...state,
        viewState: withDomainResult<boolean>(state.viewState, action.result),
      }
    case asError(SettingsActionType.SETTINGS_CHANGE_PASSWORD):
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
