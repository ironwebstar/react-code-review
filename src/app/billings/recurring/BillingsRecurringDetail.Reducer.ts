import { Map } from "immutable"
import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsRecurringDetail } from "../../../domain/billings/recurring/BillingsRecurring.Model"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  initialViewStateMap,
  startLoading,
  startLoadingMap,
  ViewState,
  ViewStateMap,
  withDomainError,
  withDomainErrorMap,
  withDomainResult,
  withDomainResultMap,
} from "../../Shared.Reducer"
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"
import { StatusType } from "../../../domain/Domain.Model"

export interface BillingsRecurringDetailState {
  viewState: ViewState<BillingsRecurringDetail>
  deleteBillingsRecurringViewState: ViewState<boolean>
  approveBillingsRecurringViewState: ViewState<boolean>
  sapSendAllBillingsRunRecurringViewState: ViewState<boolean>
  sapSendBillingsRecurringViewState: ViewStateMap<string, boolean>
  recalculateBillingsRecurringViewState: ViewStateMap<string, boolean>
  cancelBillingsRecurringViewState: ViewStateMap<string, boolean>
  removeServiceBillingRunZevViewState: ViewStateMap<string, boolean>
  expandedRows: Map<string, boolean>
  allBillingRunsRemoved: boolean
}

const initialState: BillingsRecurringDetailState = {
  viewState: initialViewState(),
  deleteBillingsRecurringViewState: initialViewState(),
  approveBillingsRecurringViewState: initialViewState(),
  sapSendAllBillingsRunRecurringViewState: initialViewState(),
  sapSendBillingsRecurringViewState: initialViewStateMap(),
  recalculateBillingsRecurringViewState: initialViewStateMap(),
  cancelBillingsRecurringViewState: initialViewStateMap(),
  removeServiceBillingRunZevViewState: initialViewStateMap(),
  expandedRows: Map(),
  allBillingRunsRemoved: false,
}

export const billingsRecurringDetailReducer = (
  state: BillingsRecurringDetailState = initialState,
  action: AnyAction,
): BillingsRecurringDetailState => {
  switch (action.type) {
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<BillingsRecurringDetail>(state.viewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<BillingsRecurringDetail>(state.viewState, action.result),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<BillingsRecurringDetail>(state.viewState, action.result),
      }
    case BillingsRecurringActionType.BILLINGS_SERVICES_EXPAND_ROW:
      return {
        ...state,
        expandedRows: state.expandedRows.set(action.serviceBillingId, action.expanded),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsRecurringViewState: startLoading<boolean>(state.deleteBillingsRecurringViewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsRecurringViewState: withDomainResult<boolean>(
          state.deleteBillingsRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsRecurringViewState: withDomainError<boolean>(
          state.deleteBillingsRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_APPROVE_BY_ID):
      return {
        ...state,
        approveBillingsRecurringViewState: startLoading<boolean>(state.approveBillingsRecurringViewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_APPROVE_BY_ID):
      return {
        ...initialState,
        approveBillingsRecurringViewState: withDomainResult<boolean>(
          state.approveBillingsRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_APPROVE_BY_ID):
      return {
        ...state,
        approveBillingsRecurringViewState: withDomainError<boolean>(
          state.approveBillingsRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_ALL):
      return {
        ...state,
        sapSendAllBillingsRunRecurringViewState: startLoading<boolean>(state.sapSendAllBillingsRunRecurringViewState),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_ALL):
      return {
        ...initialState,
        sapSendAllBillingsRunRecurringViewState: withDomainResult<boolean>(
          state.sapSendAllBillingsRunRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_ALL):
      return {
        ...state,
        sapSendAllBillingsRunRecurringViewState: withDomainError<boolean>(
          state.sapSendAllBillingsRunRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_BY_ID):
      return {
        ...state,
        sapSendBillingsRecurringViewState: startLoadingMap<string, boolean>(
          action.serviceBillingId,
          state.sapSendBillingsRecurringViewState,
        ),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_BY_ID):
      return {
        ...state,
        viewState: initialViewState(),
        sapSendBillingsRecurringViewState: withDomainResultMap<string, boolean>(
          action.serviceBillingId,
          state.sapSendBillingsRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_BY_ID):
      return {
        ...state,
        sapSendBillingsRecurringViewState: withDomainErrorMap<string, boolean>(
          action.serviceBillingId,
          state.sapSendBillingsRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_RECALCULATE_BY_ID):
      return {
        ...state,
        recalculateBillingsRecurringViewState: startLoadingMap<string, boolean>(
          action.serviceBillingId,
          state.recalculateBillingsRecurringViewState,
        ),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_RECALCULATE_BY_ID):
      return {
        ...state,
        viewState: initialViewState(),
        recalculateBillingsRecurringViewState: withDomainResultMap<string, boolean>(
          action.serviceBillingId,
          state.recalculateBillingsRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_RECALCULATE_BY_ID):
      return {
        ...state,
        recalculateBillingsRecurringViewState: withDomainErrorMap<string, boolean>(
          action.serviceBillingId,
          state.recalculateBillingsRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_CANCEL_BY_ID):
      return {
        ...state,
        cancelBillingsRecurringViewState: startLoadingMap<string, boolean>(
          action.serviceBillingId,
          state.cancelBillingsRecurringViewState,
        ),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_CANCEL_BY_ID):
      return {
        ...state,
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            serviceBillings: state.viewState.domainResult.serviceBillings.map((serviceBilling) => {
              if (serviceBilling.id === action.serviceBillingId)
                return {
                  ...serviceBilling,
                  statusType: StatusType.CANCELLED,
                }
              return serviceBilling
            }),
            statusType: serviceBillingsAllCancelled(state.viewState, action.serviceBillingId)
              ? StatusType.CANCELLED
              : state.viewState.domainResult.statusType,
          },
        },
        cancelBillingsRecurringViewState: withDomainResultMap<string, boolean>(
          action.serviceBillingId,
          state.cancelBillingsRecurringViewState,
          action.result,
        ),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_CANCEL_BY_ID):
      return {
        ...state,
        cancelBillingsRecurringViewState: withDomainErrorMap<string, boolean>(
          action.serviceBillingId,
          state.cancelBillingsRecurringViewState,
          action.result,
        ),
      }
    case asStarted(BillingsRecurringActionType.BILLINGS_RECURRING_RUN_REMOVE_BY_ID):
      return {
        ...state,
        removeServiceBillingRunZevViewState: startLoadingMap<string, boolean>(
          action.zevId,
          state.removeServiceBillingRunZevViewState,
        ),
      }
    case asSuccess(BillingsRecurringActionType.BILLINGS_RECURRING_RUN_REMOVE_BY_ID):
      return {
        ...state,
        removeServiceBillingRunZevViewState: withDomainResultMap<string, boolean>(
          action.zevId,
          state.removeServiceBillingRunZevViewState,
          action.result,
        ),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            serviceBillings: state.viewState.domainResult.serviceBillings.filter(
              (serviceBilling) => serviceBilling.zevId !== action.zevId,
            ),
          },
        },
        allBillingRunsRemoved: emptyServiceBillings(state.viewState, action.zevId),
      }
    case asError(BillingsRecurringActionType.BILLINGS_RECURRING_RUN_REMOVE_BY_ID):
      return {
        ...state,
        removeServiceBillingRunZevViewState: withDomainErrorMap<string, boolean>(
          action.zevId,
          state.removeServiceBillingRunZevViewState,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        expandedRows: state.expandedRows,
      }
    default:
      return {
        ...state,
      }
  }
}

const emptyServiceBillings = (state: ViewState<BillingsRecurringDetail>, lastRemovedZevId: string) => {
  if (!state.domainResult) return true
  const nextServiceBillings = state.domainResult.serviceBillings.filter(
    (serviceBilling) => serviceBilling.zevId !== lastRemovedZevId,
  )
  return nextServiceBillings.length === 0
}

const serviceBillingsAllCancelled = (state: ViewState<BillingsRecurringDetail>, lastCancelledBillingId: string) => {
  if (!state.domainResult) return false
  const uncancelledServiceBillings = state.domainResult.serviceBillings.filter((serviceBilling) => {
    serviceBilling.id !== lastCancelledBillingId || serviceBilling.statusType !== StatusType.CANCELLED
  })
  return uncancelledServiceBillings.length === 0
}
