import { AnyAction } from "redux"
import { ParticipantZevList } from "../../domain/participant/Participant.Model"
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

export interface ParticipantZevListState {
  viewState: ViewState<ParticipantZevList>
  csvViewState: ViewState<boolean>
}

const initialState: ParticipantZevListState = {
  viewState: initialViewState(),
  csvViewState: initialViewState(),
}

export const participantZevListReducer = (
  state: ParticipantZevListState = initialState,
  action: AnyAction,
): ParticipantZevListState => {
  switch (action.type) {
    case asStarted(ParticipantActionType.PARTICIPANT_LIST_GET_BY_ZEV_ID):
      return {
        ...state,
        viewState: startLoading<ParticipantZevList>(state.viewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_LIST_GET_BY_ZEV_ID):
      return {
        ...state,
        viewState: withDomainResult<ParticipantZevList>(state.viewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_LIST_GET_BY_ZEV_ID):
      return {
        ...state,
        viewState: withDomainError<ParticipantZevList>(state.viewState, action.result),
      }
    case asStarted(ParticipantActionType.PARTICIPANT_DOWNLOAD):
      return {
        ...state,
        csvViewState: startLoading<boolean>(state.csvViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_DOWNLOAD):
      return {
        ...state,
        csvViewState: withDomainResult<boolean>(state.csvViewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_DOWNLOAD):
      return {
        ...state,
        csvViewState: withDomainError<boolean>(state.csvViewState, action.result),
      }
    default:
      return {
        ...state,
      }
  }
}
