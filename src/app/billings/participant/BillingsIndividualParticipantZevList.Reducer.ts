import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsIndividualParticipantList } from "../../../domain/billings/participant/BillingsIndividualParticipant.Model"
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

export interface BillingsIndividualParticipantZevListState {
  viewState: ViewState<BillingsIndividualParticipantList>
}

const initialState: BillingsIndividualParticipantZevListState = {
  viewState: initialViewState(),
}

export const billingsIndividualPartcipantZevListReducer = (
  state: BillingsIndividualParticipantZevListState = initialState,
  action: AnyAction,
): BillingsIndividualParticipantZevListState => {
  switch (action.type) {
    case asStarted(BillingsParticipantActionType.BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: startLoading<BillingsIndividualParticipantList>(state.viewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsIndividualParticipantList>(state.viewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsIndividualParticipantList>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
