import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { BillingsInitialDetail } from "../../../domain/billings/initial/BillingsInitial.Model"
import { StatusType } from "../../../domain/Domain.Model"
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
import { BillingsInitialActionType } from "./BillingsInitial.Epic"

export interface BillingsInitialDetailState {
  viewState: ViewState<BillingsInitialDetail>
  deleteBillingsInitialViewState: ViewState<boolean>
  approveBillingsInitialViewState: ViewState<boolean>
  sapSendBillingsInitialViewState: ViewStateMap<string, boolean>
  recalculateBillingsInitialViewState: ViewStateMap<string, boolean>
  cancelBillingsInitialViewState: ViewStateMap<string, boolean>
}

const initialState: BillingsInitialDetailState = {
  viewState: initialViewState(),
  deleteBillingsInitialViewState: initialViewState(),
  approveBillingsInitialViewState: initialViewState(),
  sapSendBillingsInitialViewState: initialViewStateMap(),
  recalculateBillingsInitialViewState: initialViewStateMap(),
  cancelBillingsInitialViewState: initialViewStateMap(),
}

export const billingsInitialDetailReducer = (
  state: BillingsInitialDetailState = initialState,
  action: AnyAction,
): BillingsInitialDetailState => {
  switch (action.type) {
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<BillingsInitialDetail>(state.viewState),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<BillingsInitialDetail>(state.viewState, action.result),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<BillingsInitialDetail>(state.viewState, action.result),
      }
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsInitialViewState: startLoading<boolean>(state.deleteBillingsInitialViewState),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsInitialViewState: withDomainResult<boolean>(state.deleteBillingsInitialViewState, action.result),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_DELETE_BY_ID):
      return {
        ...state,
        deleteBillingsInitialViewState: withDomainError<boolean>(state.deleteBillingsInitialViewState, action.result),
      }
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_RECALCULATE):
      return {
        ...state,
        recalculateBillingsInitialViewState: startLoadingMap<string, boolean>(
          action.billingId,
          state.recalculateBillingsInitialViewState,
        ),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_RECALCULATE):
      return {
        ...initialState,
        recalculateBillingsInitialViewState: withDomainResultMap<string, boolean>(
          action.billingId,
          state.recalculateBillingsInitialViewState,
          action.result,
        ),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_RECALCULATE):
      return {
        ...state,
        recalculateBillingsInitialViewState: withDomainErrorMap<string, boolean>(
          action.billingId,
          state.recalculateBillingsInitialViewState,
          action.result,
        ),
      }
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_APPROVE_BY_ID):
      return {
        ...state,
        approveBillingsInitialViewState: startLoading<boolean>(state.approveBillingsInitialViewState),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_APPROVE_BY_ID):
      return {
        ...state,
        approveBillingsInitialViewState: withDomainResult<boolean>(
          state.approveBillingsInitialViewState,
          action.result,
        ),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_APPROVE_BY_ID):
      return {
        ...state,
        approveBillingsInitialViewState: withDomainError<boolean>(state.approveBillingsInitialViewState, action.result),
      }
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_CANCEL_BY_ID):
      return {
        ...state,
        cancelBillingsInitialViewState: startLoadingMap<string, boolean>(
          action.billingId,
          state.cancelBillingsInitialViewState,
        ),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_CANCEL_BY_ID):
      return {
        ...state,
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            statusType: StatusType.CANCELLED,
          },
        },
        cancelBillingsInitialViewState: withDomainResultMap<string, boolean>(
          action.billingId,
          state.cancelBillingsInitialViewState,
          action.result,
        ),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_CANCEL_BY_ID):
      return {
        ...state,
        cancelBillingsInitialViewState: withDomainErrorMap<string, boolean>(
          action.billingId,
          state.cancelBillingsInitialViewState,
          action.result,
        ),
      }
    case asStarted(BillingsInitialActionType.BILLINGS_INITIAL_SUBMIT_TO_SAP):
      return {
        ...state,
        sapSendBillingsInitialViewState: startLoadingMap<string, boolean>(
          action.billingId,
          state.sapSendBillingsInitialViewState,
        ),
      }
    case asSuccess(BillingsInitialActionType.BILLINGS_INITIAL_SUBMIT_TO_SAP):
      return {
        ...state,
        sapSendBillingsInitialViewState: withDomainResultMap<string, boolean>(
          action.billingId,
          state.sapSendBillingsInitialViewState,
          action.result,
        ),
      }
    case asError(BillingsInitialActionType.BILLINGS_INITIAL_SUBMIT_TO_SAP):
      return {
        ...state,
        sapSendBillingsInitialViewState: withDomainErrorMap<string, boolean>(
          action.billingId,
          state.sapSendBillingsInitialViewState,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
