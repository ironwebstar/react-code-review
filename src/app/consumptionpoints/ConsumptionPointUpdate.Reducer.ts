import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import {
  ConsumptionPointPricePackage,
  ConsumptionPointUpsert,
} from "../../domain/consumptionpoints/ConsumptionPoints.Model"
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
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"

export interface ConsumptionPointUpdateState {
  getViewState: ViewState<ConsumptionPointUpsert>
  updateViewState: ViewState<boolean>
  formOptionsViewState: ViewState<ConsumptionPointPricePackage[]>
}

const initialState: ConsumptionPointUpdateState = {
  getViewState: initialViewState(),
  updateViewState: initialViewState(),
  formOptionsViewState: initialViewState(),
}

export const consumptionPointUpdateReducer = (
  state: ConsumptionPointUpdateState = initialState,
  action: AnyAction,
): ConsumptionPointUpdateState => {
  switch (action.type) {
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: startLoading<ConsumptionPointUpsert>(state.getViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainResult<ConsumptionPointUpsert>(state.getViewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<ConsumptionPointUpsert>(state.getViewState, action.result),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<boolean>(state.updateViewState, action.result),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS):
      return {
        ...state,
        formOptionsViewState: startLoading<ConsumptionPointPricePackage[]>(state.formOptionsViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS):
      return {
        ...state,
        formOptionsViewState: withDomainResult<ConsumptionPointPricePackage[]>(
          state.formOptionsViewState,
          action.result,
        ),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS):
      return {
        ...state,
        formOptionsViewState: withDomainError<ConsumptionPointPricePackage[]>(
          state.formOptionsViewState,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
