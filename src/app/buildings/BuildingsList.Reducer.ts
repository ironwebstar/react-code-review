import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BuildingsList } from "../../domain/buildings/Buildings.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
  showAlertForRoute,
} from "../Shared.Reducer"
import { BuildingsActionType } from "./Buildings.Epic"

export interface BuildingsListState {
  viewState: ViewState<BuildingsList>
  showDeleteSuccess: boolean
}

const initialState: BuildingsListState = {
  viewState: initialViewState(),
  showDeleteSuccess: false,
}

export const buildingsListReducer = (
  state: BuildingsListState = initialState,
  action: AnyAction,
): BuildingsListState => {
  switch (action.type) {
    case asStarted(BuildingsActionType.BUILDINGS_LIST_GET):
      return {
        ...state,
        viewState: startLoading<BuildingsList>(state.viewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<BuildingsList>(state.viewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<BuildingsList>(state.viewState, action.result),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_DELETE):
      return {
        ...state,
        showDeleteSuccess: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteSuccess: showAlertForRoute(state.showDeleteSuccess, "buildings", action.payload.location.pathname),
      }
    default:
      return {
        ...state,
      }
  }
}
