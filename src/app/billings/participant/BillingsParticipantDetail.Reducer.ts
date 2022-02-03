import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import {
  BillingsParticipantDetail,
  BillingStatusType,
} from "../../../domain/billings/participant/BillingsParticipant.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
  initialViewStateMap,
  startLoadingMap,
  ViewStateMap,
  withDomainErrorMap,
  withDomainResultMap,
} from "../../Shared.Reducer"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"

export interface BillingsParticipantDetailState {
  viewState: ViewState<BillingsParticipantDetail>
  updatePricesViewState: ViewState<boolean>
  suspendViewState: ViewState<boolean>
  unsuspendViewState: ViewState<boolean>
  approveViewState: ViewState<boolean>
  billPdfViewStateMap: ViewStateMap<string, boolean>
}

const initialState: BillingsParticipantDetailState = {
  viewState: initialViewState(),
  updatePricesViewState: initialViewState(),
  suspendViewState: initialViewState(),
  unsuspendViewState: initialViewState(),
  approveViewState: initialViewState(),
  billPdfViewStateMap: initialViewStateMap(),
}

export const billingsPartcipantDetailReducer = (
  state: BillingsParticipantDetailState = initialState,
  action: AnyAction,
): BillingsParticipantDetailState => {
  switch (action.type) {
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET):
      return {
        ...state,
        viewState: startLoading<BillingsParticipantDetail>(state.viewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsParticipantDetail>(state.viewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsParticipantDetail>(state.viewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_APPROVE):
      return {
        ...state,
        suspendViewState: initialViewState(),
        unsuspendViewState: initialViewState(),
        approveViewState: startLoading<boolean>(state.approveViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_APPROVE):
      return {
        ...state,
        approveViewState: withDomainResult<boolean>(state.approveViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_APPROVE):
      return {
        ...state,
        approveViewState: withDomainError<boolean>(state.approveViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SUSPEND):
      return {
        ...state,
        approveViewState: initialViewState(),
        unsuspendViewState: initialViewState(),
        suspendViewState: startLoading<boolean>(state.suspendViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SUSPEND):
      return {
        ...state,
        suspendViewState: withDomainResult<boolean>(state.suspendViewState, action.result),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            billingStatusType: BillingStatusType.SUSPENDED,
          },
        },
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SUSPEND):
      return {
        ...state,
        suspendViewState: withDomainError<boolean>(state.suspendViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_UNSUSPEND):
      return {
        ...state,
        approveViewState: initialViewState(),
        suspendViewState: initialViewState(),
        unsuspendViewState: startLoading<boolean>(state.unsuspendViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_UNSUSPEND):
      return {
        ...state,
        unsuspendViewState: withDomainResult<boolean>(state.unsuspendViewState, action.result),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            billingStatusType: BillingStatusType.IN_PROGRESS,
          },
        },
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_UNSUSPEND):
      return {
        ...state,
        unsuspendViewState: withDomainError<boolean>(state.unsuspendViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES):
      return {
        ...state,
        updatePricesViewState: startLoading<boolean>(state.updatePricesViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES):
      return {
        ...state,
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            prices: Array.from(action.pricesUpsert.values()),
            upsertPrices: action.pricesUpsert,
          },
        },
        updatePricesViewState: withDomainResult<boolean>(state.updatePricesViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES):
      return {
        ...state,
        updatePricesViewState: withDomainError<boolean>(state.updatePricesViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_BILL_PDF_GET):
      return {
        ...state,
        billPdfViewStateMap: startLoadingMap<string, boolean>(action.billId, state.billPdfViewStateMap),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_BILL_PDF_GET):
      return {
        ...state,
        billPdfViewStateMap: withDomainResultMap<string, boolean>(
          action.billId,
          state.billPdfViewStateMap,
          action.result,
        ),
      }
    case asError(BillingsParticipantActionType.BILLINGS_BILL_PDF_GET):
      return {
        ...state,
        billPdfViewStateMap: withDomainErrorMap<string, boolean>(
          action.billId,
          state.billPdfViewStateMap,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        viewState: state.viewState,
      }
    default:
      return {
        ...state,
      }
  }
}
