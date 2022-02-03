import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BuildingDetail } from "../../domain/buildings/Buildings.Model"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  showSuccessAlertById,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { BuildingsActionType } from "./Buildings.Epic"

export interface BuildingsDetailState {
  viewState: ViewState<BuildingDetail>
  deactivateViewState: ViewState<boolean>
  deleteViewState: ViewState<boolean>
  showUpdateAlert: boolean
  prevId?: string
}

const initialState: BuildingsDetailState = {
  viewState: initialViewState(),
  deactivateViewState: initialViewState(),
  deleteViewState: initialViewState(),
  showUpdateAlert: false,
}

export const buildingsDetailReducer = (state: BuildingsDetailState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(BuildingsActionType.BUILDINGS_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<BuildingDetail>(state.viewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<BuildingDetail>(state.viewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<BuildingDetail>(state.viewState, action.result),
      }
    case asStarted(BuildingsActionType.BUILDINGS_DEACTIVATE):
      return {
        ...state,
        deactivateViewState: startLoading<boolean>(state.deactivateViewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_DEACTIVATE):
      return {
        ...state,
        viewState: initialViewState<BuildingDetail>(),
        deactivateViewState: withDomainResult<boolean>(state.deactivateViewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_DEACTIVATE):
      return {
        ...state,
        deactivateViewState: withDomainError<boolean>(state.deactivateViewState, action.result),
      }
    case asStarted(BuildingsActionType.BUILDINGS_DELETE):
      return {
        ...state,
        deleteViewState: startLoading<boolean>(state.deleteViewState),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_DELETE):
      return {
        ...state,
        deleteViewState: withDomainResult<boolean>(state.deleteViewState, action.result),
      }
    case asError(BuildingsActionType.BUILDINGS_DELETE):
      return {
        ...state,
        deleteViewState: withDomainError<boolean>(state.deleteViewState, action.result),
      }
    case asSuccess(BuildingsActionType.BUILDINGS_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
        viewState: initialViewState<BuildingDetail>(),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        prevId: state.viewState.domainResult?.id ?? state.prevId,
        showUpdateAlert: showSuccessAlertById(state.showUpdateAlert, action.payload.location.pathname, state.prevId),
      }
    default:
      return {
        ...state,
      }
  }
}
