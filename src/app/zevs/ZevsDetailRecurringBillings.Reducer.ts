import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ZevsActionType } from "./Zevs.Epic"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { ZevDetailBillingsList } from "../../domain/zevs/ZevsDetail.Model"

export interface ZevsDetailRecurringBillingsState {
  viewState: ViewState<ZevDetailBillingsList>
}

const initialState: ZevsDetailRecurringBillingsState = {
  viewState: initialViewState(),
}

export const zevsDetailRecurringBillingsReducer = (
  state: ZevsDetailRecurringBillingsState = initialState,
  action: AnyAction,
): ZevsDetailRecurringBillingsState => {
  switch (action.type) {
    case asStarted(ZevsActionType.ZEVS_DETAIL_RECURRING_SERVICE_INVOICE):
      return {
        ...state,
        viewState: startLoading<ZevDetailBillingsList>(state.viewState),
      }
    case asSuccess(ZevsActionType.ZEVS_DETAIL_RECURRING_SERVICE_INVOICE):
      return {
        ...state,
        viewState: withDomainResult<ZevDetailBillingsList>(state.viewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_DETAIL_RECURRING_SERVICE_INVOICE):
      return {
        ...state,
        viewState: withDomainError<ZevDetailBillingsList>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}