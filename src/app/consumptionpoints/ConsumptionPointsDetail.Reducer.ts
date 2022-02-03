import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ConsumptionPointDetailItem } from "../../domain/consumptionpoints/ConsumptionPoints.Model"
import { StatusType } from "../../domain/Domain.Model"
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
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"

export interface ConsumptionPointsDetailState {
  viewState: ViewState<ConsumptionPointDetailItem>
  deactivateViewState: ViewState<boolean>
  deleteViewState: ViewState<boolean>
}

const initialState: ConsumptionPointsDetailState = {
  viewState: initialViewState(),
  deactivateViewState: initialViewState(),
  deleteViewState: initialViewState(),
}

export const consumptionPointsDetailReducer = (
  state: ConsumptionPointsDetailState = initialState,
  action: AnyAction,
): ConsumptionPointsDetailState => {
  switch (action.type) {
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<ConsumptionPointDetailItem>(state.viewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<ConsumptionPointDetailItem>(state.viewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<ConsumptionPointDetailItem>(state.viewState, action.result),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateViewState: startLoading<boolean>(state.deactivateViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateViewState: withDomainResult<boolean>(state.deactivateViewState, action.result),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            statusType: StatusType.INACTIVE,
          },
        },
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateViewState: withDomainError<boolean>(state.deactivateViewState, action.result),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID):
      return {
        ...state,
        deleteViewState: startLoading<boolean>(state.deleteViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID):
      return {
        ...state,
        deleteViewState: withDomainResult<boolean>(state.deleteViewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID):
      return {
        ...state,
        deleteViewState: withDomainError<boolean>(state.deleteViewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
      }
    default:
      return {
        ...state,
      }
  }
}
