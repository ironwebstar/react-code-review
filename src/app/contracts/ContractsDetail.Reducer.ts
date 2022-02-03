import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ContractDetail } from "../../domain/contracts/Contracts.Models"
import { StatusType } from "../../domain/Domain.Model"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  showSuccessAlertById,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { ContractsActionType } from "./Contracts.Epic"

export interface ContractsDetailState {
  getViewState: ViewState<ContractDetail>
  replaceContractViewState: ViewState<string>
  approveContractViewState: ViewState<boolean>
  deleteContractViewState: ViewState<boolean>
  showUpdateAlert: boolean
  showReplaceAlert: boolean
  prevId?: string
}

export const initialState: ContractsDetailState = {
  getViewState: initialViewState(),
  replaceContractViewState: initialViewState(),
  approveContractViewState: initialViewState(),
  deleteContractViewState: initialViewState(),
  showUpdateAlert: false,
  showReplaceAlert: false,
}

export const contractsDetailReducer = (
  state: ContractsDetailState = initialState,
  action: AnyAction,
): ContractsDetailState => {
  switch (action.type) {
    case asStarted(ContractsActionType.CONTRACT_GET_BY_ID):
      return {
        ...state,
        getViewState: startLoading<ContractDetail>(state.getViewState),
      }
    case asSuccess(ContractsActionType.CONTRACT_GET_BY_ID):
      return {
        ...state,
        prevId: state.getViewState.domainResult?.id,
        getViewState: withDomainResult<ContractDetail>(state.getViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACT_GET_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<ContractDetail>(state.getViewState, action.result),
      }
    case asStarted(ContractsActionType.CONTRACT_REPLACE):
      return {
        ...state,
        replaceContractViewState: startLoading<string>(state.replaceContractViewState),
      }
    case asSuccess(ContractsActionType.CONTRACT_REPLACE):
      return {
        ...state,
        showReplaceAlert: true,
        replaceContractViewState: withDomainResult<string>(state.replaceContractViewState, action.result),
        getViewState: initialViewState(),
      }
    case asError(ContractsActionType.CONTRACT_REPLACE):
      return {
        ...state,
        replaceContractViewState: withDomainError<string>(state.replaceContractViewState, action.result),
      }
    case asStarted(ContractsActionType.CONTRACT_APPROVE):
      return {
        ...state,
        approveContractViewState: startLoading<boolean>(state.approveContractViewState),
      }
    case asSuccess(ContractsActionType.CONTRACT_APPROVE):
      return {
        ...state,
        approveContractViewState: withDomainResult<boolean>(state.approveContractViewState, action.result),
        getViewState: {
          ...state.getViewState,
          domainResult: state.getViewState.domainResult && {
            ...state.getViewState.domainResult,
            contractStatus: StatusType.APPROVED,
          },
        },
      }
    case asError(ContractsActionType.CONTRACT_APPROVE):
      return {
        ...state,
        approveContractViewState: withDomainError<boolean>(state.approveContractViewState, action.result),
      }
    case asStarted(ContractsActionType.CONTRACT_DELETE):
      return {
        ...state,
        deleteContractViewState: startLoading<boolean>(state.deleteContractViewState),
      }
    case asSuccess(ContractsActionType.CONTRACT_DELETE):
      return {
        ...state,
        getViewState: initialViewState(),
        deleteContractViewState: withDomainResult<boolean>(state.deleteContractViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACT_DELETE):
      return {
        ...state,
        deleteContractViewState: withDomainError<boolean>(state.deleteContractViewState, action.result),
      }
    case asSuccess(ContractsActionType.CONTRACTS_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        prevId: state.getViewState.domainResult?.id ?? state.prevId,
        showReplaceAlert: showSuccessAlertById(state.showReplaceAlert, action.payload.location.pathname, state.prevId),
        showUpdateAlert: showSuccessAlertById(state.showUpdateAlert, action.payload.location.pathname, state.prevId),
      }
    default:
      return {
        ...state,
      }
  }
}
