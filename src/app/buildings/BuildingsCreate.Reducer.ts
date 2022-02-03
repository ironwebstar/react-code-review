import { LOCATION_CHANGE } from "connected-react-router"
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
import { BuildingsActionType } from "./Buildings.Epic"

export interface BuildingsCreateState {
  createViewState: ViewState<string>
}

const initialState: BuildingsCreateState = {
  createViewState: initialViewState(),
}

export const buildingsCreateReducer = (state: BuildingsCreateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(BuildingsActionType.BUILDINGS_CREATE):
      return {
        ...state,
        createViewState: startLoading<string>(state.createViewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_CREATE):
      return {
        ...state,
        createViewState: withDomainResult<string>(state.createViewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_CREATE):
      return {
        ...state,
        createViewState: withDomainError<string>(state.createViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
