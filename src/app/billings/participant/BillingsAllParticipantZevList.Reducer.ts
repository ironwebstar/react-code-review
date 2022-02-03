import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsAllParticipantList } from "../../../domain/billings/participant/BillingsAllParticipant.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
} from "../../Shared.Reducer"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"

export interface BillingsAllParticipantZevListState {
  viewState: ViewState<BillingsAllParticipantList>
}

const initialState: BillingsAllParticipantZevListState = {
  viewState: initialViewState(),
}

export const billingsAllPartcipantZevListReducer = (
  state: BillingsAllParticipantZevListState = initialState,
  action: AnyAction,
): BillingsAllParticipantZevListState => {
  switch (action.type) {
    case asStarted(BillingsParticipantActionType.BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: startLoading<BillingsAllParticipantList>(state.viewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsAllParticipantList>(state.viewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsAllParticipantList>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
