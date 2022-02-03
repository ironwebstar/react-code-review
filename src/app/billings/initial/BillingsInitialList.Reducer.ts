import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsInitialList } from "../../../domain/billings/initial/BillingsInitial.Model"
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
import { BillingsInitialActionType } from "./BillingsInitial.Epic"

export interface BillingsInitialListState {
  viewState: ViewState<BillingsInitialList>
}

const initialState: BillingsInitialListState = {
  viewState: initialViewState(),
}

export const billingsInitialListReducer = (
  state: BillingsInitialListState = initialState,
  action: AnyAction,
): BillingsInitialListState => {
  switch (action.type) {
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_LIST_GET):
      return {
        ...state,
        viewState: startLoading<BillingsInitialList>(state.viewState),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsInitialList>(state.viewState, action.result),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsInitialList>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
