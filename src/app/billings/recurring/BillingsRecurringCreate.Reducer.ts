import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
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
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"
import { BillingRecurringZevListItem } from "../../../domain/billings/recurring/BillingsRecurring.Model"

export interface BillingsRecurringCreateState {
  viewState: ViewState<string>
  zevsListViewState: ViewState<BillingRecurringZevListItem[]>
}

const initialState: BillingsRecurringCreateState = {
  viewState: initialViewState(),
  zevsListViewState: initialViewState(),
}

export const billingsRecurringCreateReducer = (
  state: BillingsRecurringCreateState = initialState,
  action: AnyAction,
): BillingsRecurringCreateState => {
  switch (action.type) {
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_CREATE):
      return {
        ...state,
        viewState: startLoading<string>(state.viewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_CREATE):
      return {
        ...state,
        viewState: withDomainResult<string>(state.viewState, action.result),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_CREATE):
      return {
        ...state,
        viewState: withDomainError<string>(state.viewState, action.result),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_ZEVS_GET_LIST):
      return {
        ...state,
        zevsListViewState: startLoading<BillingRecurringZevListItem[]>(state.zevsListViewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_ZEVS_GET_LIST):
      return {
        ...state,
        zevsListViewState: withDomainResult<BillingRecurringZevListItem[]>(state.zevsListViewState, action.result),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_ZEVS_GET_LIST):
      return {
        ...state,
        zevsListViewState: withDomainError<BillingRecurringZevListItem[]>(state.zevsListViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
