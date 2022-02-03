import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
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
import { ConsumptionPointPricePackage } from "../../domain/consumptionpoints/ConsumptionPoints.Model"

export interface ConsumptionPointsCreateState {
  createViewState: ViewState<string>
  formOptionsViewState: ViewState<ConsumptionPointPricePackage[]>
}

const initialState: ConsumptionPointsCreateState = {
  createViewState: initialViewState(),
  formOptionsViewState: initialViewState(),
}

export const consumptionPointsCreateReducer = (
  state: ConsumptionPointsCreateState = initialState,
  action: AnyAction,
): ConsumptionPointsCreateState => {
  switch (action.type) {
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_CREATE):
      return {
        ...state,
        createViewState: startLoading<string>(state.createViewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_CREATE):
      return {
        ...state,
        createViewState: withDomainResult<string>(state.createViewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_CREATE):
      return {
        ...state,
        createViewState: withDomainError<string>(state.createViewState, action.result),
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
