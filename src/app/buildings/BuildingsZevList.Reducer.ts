import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BuildingsZevList } from "../../domain/buildings/Buildings.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { BuildingsActionType } from "./Buildings.Epic"

export interface BuildingsZevListState {
  viewState: ViewState<BuildingsZevList>
}

const initialState: BuildingsZevListState = {
  viewState: initialViewState(),
}

export const buildingsZevListReducer = (
  viewState: BuildingsZevListState = initialState,
  action: AnyAction,
): BuildingsZevListState => {
  switch (action.type) {
    case asStarted(BuildingsActionType.BUILDINGS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: startLoading<BuildingsZevList>(viewState.viewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: withDomainResult<BuildingsZevList>(viewState.viewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: withDomainError<BuildingsZevList>(viewState.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...viewState,
      }
  }
}
