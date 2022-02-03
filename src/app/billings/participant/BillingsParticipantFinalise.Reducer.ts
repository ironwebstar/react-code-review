import { Map } from "immutable"
import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import {
  BillingsConsumptionItem,
  BillingsParticipantFinalise,
  ZevServiceComponentFeaturesResponse,
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
  ViewStateMap,
  initialViewStateMap,
  startLoadingMap,
  withDomainErrorMap,
  withDomainResultMap,
} from "../../Shared.Reducer"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"

export interface BillingsParticipantFinaliseState {
  viewState: ViewState<BillingsParticipantFinalise>
  pdfViewState: ViewState<boolean>
  csvViewState: ViewState<boolean>
  reopenViewState: ViewState<boolean>
  sapSendViewState: ViewState<boolean>
  componentFeaturesDataViewState: ViewState<ZevServiceComponentFeaturesResponse>
  billPdfViewStateMap: ViewStateMap<string, boolean>
  billPaidViewStateMap: ViewStateMap<string, boolean>
}

const initialState: BillingsParticipantFinaliseState = {
  viewState: initialViewState(),
  pdfViewState: initialViewState(),
  csvViewState: initialViewState(),
  reopenViewState: initialViewState(),
  sapSendViewState: initialViewState(),
  componentFeaturesDataViewState: initialViewState(),
  billPdfViewStateMap: initialViewStateMap(),
  billPaidViewStateMap: initialViewStateMap(),
}

export const billingsPartcipantFinaliseReducer = (
  state: BillingsParticipantFinaliseState = initialState,
  action: AnyAction,
): BillingsParticipantFinaliseState => {
  switch (action.type) {
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_FINALISE_GET):
      return {
        ...state,
        viewState: startLoading<BillingsParticipantFinalise>(state.viewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_FINALISE_GET):
      return {
        ...state,
        viewState: withDomainResult<BillingsParticipantFinalise>(state.viewState, action.result),
        billPaidViewStateMap: {
          ...state.billPaidViewStateMap,
          domainResult: Map(
            action.result.allConsumption.map((consumption: BillingsConsumptionItem) => [
              consumption.billId,
              consumption.paid,
            ]),
          ),
        },
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_FINALISE_GET):
      return {
        ...state,
        viewState: withDomainError<BillingsParticipantFinalise>(state.viewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_PDF_GET):
      return {
        ...state,
        csvViewState: initialViewState(),
        pdfViewState: startLoading<boolean>(state.pdfViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_PDF_GET):
      return {
        ...state,
        pdfViewState: withDomainResult<boolean>(state.pdfViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_PDF_GET):
      return {
        ...state,
        pdfViewState: withDomainError<boolean>(state.pdfViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_CSV_GET):
      return {
        ...state,
        pdfViewState: initialViewState(),
        csvViewState: startLoading<boolean>(state.csvViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_CSV_GET):
      return {
        ...state,
        csvViewState: withDomainResult<boolean>(state.csvViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_CSV_GET):
      return {
        ...state,
        csvViewState: withDomainError<boolean>(state.csvViewState, action.result),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_REOPEN):
      return {
        ...state,
        pdfViewState: initialViewState(),
        csvViewState: initialViewState(),
        reopenViewState: startLoading<boolean>(state.reopenViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_REOPEN):
      return {
        ...state,
        reopenViewState: withDomainResult<boolean>(state.reopenViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_REOPEN):
      return {
        ...state,
        reopenViewState: withDomainError<boolean>(state.reopenViewState, action.result),
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
    case asStarted(BillingsParticipantActionType.BILLINGS_BILL_PAID):
      return {
        ...state,
        billPaidViewStateMap: startLoadingMap<string, boolean>(action.billId, state.billPaidViewStateMap),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_BILL_PAID):
      return {
        ...state,
        billPaidViewStateMap: withDomainResultMap<string, boolean>(
          action.billId,
          state.billPaidViewStateMap,
          action.result,
        ),
      }
    case asError(BillingsParticipantActionType.BILLINGS_BILL_PAID):
      return {
        ...state,
        billPaidViewStateMap: withDomainErrorMap<string, boolean>(
          action.billId,
          state.billPaidViewStateMap,
          action.result,
        ),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES):
      return {
        ...state,
        componentFeaturesDataViewState: startLoading<ZevServiceComponentFeaturesResponse>(
          state.componentFeaturesDataViewState,
        ),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES):
      return {
        ...state,
        componentFeaturesDataViewState: withDomainResult<ZevServiceComponentFeaturesResponse>(
          state.componentFeaturesDataViewState,
          action.result,
        ),
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES):
      return {
        ...state,
        componentFeaturesDataViewState: withDomainError<ZevServiceComponentFeaturesResponse>(
          state.componentFeaturesDataViewState,
          action.result,
        ),
      }
    case asStarted(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND):
      return {
        ...state,
        sapSendViewState: startLoading<boolean>(state.sapSendViewState),
      }
    case asSuccess(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND):
      return {
        ...state,
        sapSendViewState: withDomainResult<boolean>(state.sapSendViewState, action.result),
      }
    case asError(BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND):
      return {
        ...state,
        sapSendViewState: withDomainError<boolean>(state.sapSendViewState, action.result),
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
