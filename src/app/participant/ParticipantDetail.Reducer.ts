import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ParticipantDetail } from "../../domain/participant/Participant.Model"
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

export interface ParticipantDetailState {
  viewState: ViewState<ParticipantDetail>
  syncViewState: ViewState<boolean>
  deleteViewState: ViewState<boolean>
}

const initialState: ParticipantDetailState = {
  viewState: initialViewState(),
  syncViewState: initialViewState(),
  deleteViewState: initialViewState(),
}

export const participantDetailReducer = (
  state: ParticipantDetailState = initialState,
  action: AnyAction,
): ParticipantDetailState => {
  switch (action.type) {
    case asStarted(ParticipantActionType.PARTICIPANT_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<ParticipantDetail>(state.viewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<ParticipantDetail>(state.viewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<ParticipantDetail>(state.viewState, action.result),
      }
    case asStarted(ParticipantActionType.PARTICIPANT_SYNC):
      return {
        ...state,
        syncViewState: startLoading<boolean>(state.syncViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_SYNC):
      return initialState
    case asError(ParticipantActionType.PARTICIPANT_SYNC):
      return {
        ...state,
        syncViewState: withDomainError<boolean>(state.syncViewState, action.result),
      }
    case asStarted(ParticipantActionType.PARTICIPANT_DELETE):
      return {
        ...state,
        deleteViewState: startLoading<boolean>(state.deleteViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_DELETE):
      return {
        ...state,
        deleteViewState: withDomainResult<boolean>(state.deleteViewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_DELETE):
      return {
        ...state,
        deleteViewState: withDomainError<boolean>(state.deleteViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
