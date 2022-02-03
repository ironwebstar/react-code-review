import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsRecurringList } from "../../../domain/billings/recurring/BillingsRecurring.Model"
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
} from "../../Shared.Reducer"
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"

export interface BillingsRecurringListState {
  viewState: ViewState<BillingsRecurringList>
  showDeleteSuccess: boolean
}

const initialState: BillingsRecurringListState = {
  viewState: initialViewState(),
  showDeleteSuccess: false,
}

export const billingsRecurringListReducer = (
  state: BillingsRecurringListState = initialState,
  action: AnyAction,
): BillingsRecurringListState => {
  switch (action.type) {
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_LIST_GET):
      return {
        ...state,
        viewState: startLoading<BillingsRecurringList>(state.viewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsRecurringList>(state.viewState, action.result),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsRecurringList>(state.viewState, action.result),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID):
      return {
        ...state,
        showDeleteSuccess: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteSuccess: showAlertForRoute(
          state.showDeleteSuccess,
          "billings/recurring",
          action.payload.location.pathname,
        ),
      }
    default:
      return {
        ...state,
      }
  }
}
