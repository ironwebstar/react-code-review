import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"

import { ConsumptionPointParticipationsData } from "../../domain/participant/Participant.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
  ViewStateMap,
  initialViewStateMap,
  startLoadingMap,
  withDomainErrorMap,
  withDomainResultMap,
} from "../Shared.Reducer"
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"

export interface ConsumptionPointsParticipationsState {
  viewState: ViewState<ConsumptionPointParticipationsData>
  deleteViewStateMap: ViewStateMap<string, boolean>
  moveOutViewStateMap: ViewStateMap<string, string>
  moveInViewStateMap: ViewStateMap<string, string>
  prevDeleteId?: string
}

const initialState: ConsumptionPointsParticipationsState = {
  viewState: initialViewState(),
  deleteViewStateMap: initialViewStateMap(),
  moveOutViewStateMap: initialViewStateMap(),
  moveInViewStateMap: initialViewStateMap(),
}

export const ConsumptionPointsParticipationsReducer = (
  state: ConsumptionPointsParticipationsState = initialState,
  action: AnyAction,
): ConsumptionPointsParticipationsState => {
  switch (action.type) {
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_PARTICIPATIONS):
      return {
        ...state,
        viewState: startLoading<ConsumptionPointParticipationsData>(state.viewState),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_PARTICIPATIONS):
      return {
        ...state,
        viewState: withDomainResult<ConsumptionPointParticipationsData>(state.viewState, action.result),
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_PARTICIPATIONS):
      return {
        ...state,
        viewState: withDomainError<ConsumptionPointParticipationsData>(state.viewState, action.result),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID):
      return {
        ...state,
        deleteViewStateMap: startLoadingMap<string, boolean>(action.participationId, state.deleteViewStateMap),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID):
      return {
        ...state,
        prevDeleteId: action.participationId,
        deleteViewStateMap: withDomainResultMap<string, boolean>(
          action.participationId,
          state.deleteViewStateMap,
          action.result,
        ),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            participations: state.viewState.domainResult.participations.filter(
              (participation) => participation.id !== action.participationId,
            ),
          },
        },
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID):
      return {
        ...state,
        deleteViewStateMap: withDomainErrorMap<string, boolean>(
          action.participationId,
          state.deleteViewStateMap,
          action.result,
        ),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT):
      return {
        ...state,
        moveOutViewStateMap: startLoadingMap<string, string>(action.participationId, state.moveOutViewStateMap),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT):
      return {
        ...initialState,
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT):
      return {
        ...state,
        moveOutViewStateMap: withDomainErrorMap<string, string>(
          action.participationId,
          state.moveOutViewStateMap,
          action.result,
        ),
      }
    case asStarted(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_IN):
      return {
        ...state,
        moveInViewStateMap: startLoadingMap<string, string>(action.participationId, state.moveInViewStateMap),
      }
    case asSuccess(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_IN):
      return {
        ...initialState,
      }
    case asError(ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_IN):
      return {
        ...state,
        moveInViewStateMap: withDomainErrorMap<string, string>(
          action.participationId,
          state.moveInViewStateMap,
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
