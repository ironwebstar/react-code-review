import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
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

export interface ParticipantCreateState {
  createViewState: ViewState<string>
}

const initialState: ParticipantCreateState = {
  createViewState: initialViewState(),
}

export const participantCreateReducer = (
  state: ParticipantCreateState = initialState,
  action: AnyAction,
): ParticipantCreateState => {
  switch (action.type) {
    case asStarted(ParticipantActionType.PARTICIPANT_CREATE):
      return {
        ...state,
        createViewState: startLoading<string>(state.createViewState),
      }
    case asSuccess(ParticipantActionType.PARTICIPANT_CREATE):
      return {
        ...state,
        createViewState: withDomainResult<string>(state.createViewState, action.result),
      }
    case asError(ParticipantActionType.PARTICIPANT_CREATE):
      return {
        ...state,
        createViewState: withDomainError<string>(state.createViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
