import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ConsumptionPointsList } from "../../domain/consumptionpoints/ConsumptionPoints.Model"
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
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"

export interface ConsumptionPointsListState {
  viewState: ViewState<ConsumptionPointsList>
  showDeleteAlert: boolean
}

const initialState: ConsumptionPointsListState = {
  viewState: initialViewState(),
  showDeleteAlert: false,
}

export const consumptionPointsListReducer = (
  state: ConsumptionPointsListState = initialState,
  action: AnyAction,
): ConsumptionPointsListState => {
  switch (action.type) {
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINTS_LIST_GET):
      return {
        ...state,
        viewState: startLoading<ConsumptionPointsList>(state.viewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINTS_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<ConsumptionPointsList>(state.viewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINTS_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<ConsumptionPointsList>(state.viewState, action.result),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID):
      return {
        ...state,
        showDeleteAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteAlert: showAlertForRoute(
          state.showDeleteAlert,
          "consumptionpoints",
          action.payload.location.pathname,
        ),
      }
    default:
      return {
        ...state,
      }
  }
}
