import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ParticipantUpsert } from "../../domain/participant/Participant.Model"
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
import { ParticipantActionType } from "./Participant.Epic"

export interface ParticipantUpdateState {
  getViewState: ViewState<ParticipantUpsert>
  updateViewState: ViewState<boolean>
}

const initialState: ParticipantUpdateState = {
  getViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const participantUpdateReducer = (
  state: ParticipantUpdateState = initialState,
  action: AnyAction,
): ParticipantUpdateState => {
  switch (action.type) {
    case asStarted(ParticipantActionType.PARTICIPANT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: startLoading<ParticipantUpsert>(state.getViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainResult<ParticipantUpsert>(state.getViewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<ParticipantUpsert>(state.getViewState, action.result),
      }
    case asStarted(ParticipantActionType.PARTICIPANT_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_UPDATE):
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
