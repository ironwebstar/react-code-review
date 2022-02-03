import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BuildingUpsert } from "../../domain/buildings/Buildings.Model"
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

export interface BuildingsUpdateState {
  getViewState: ViewState<BuildingUpsert>
  updateViewState: ViewState<boolean>
}

const initialState: BuildingsUpdateState = {
  getViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const buildingsUpdateReducer = (state: BuildingsUpdateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(BuildingsActionType.BUILDINGS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: startLoading<BuildingUpsert>(state.getViewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainResult<BuildingUpsert>(state.getViewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<BuildingUpsert>(state.getViewState, action.result),
      }
    case asStarted(BuildingsActionType.BUILDINGS_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<boolean>(state.updateViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
