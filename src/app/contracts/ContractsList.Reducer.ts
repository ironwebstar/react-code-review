import { AnyAction } from "redux"
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
} from "../Shared.Reducer"
import { ContractsActionType } from "./Contracts.Epic"
import { ContractsList } from "../../domain/contracts/Contracts.Models"
import { LOCATION_CHANGE } from "connected-react-router"

export interface ContractsListState {
  viewState: ViewState<ContractsList>
  showDeleteSuccess: boolean
}

export const initialState: ContractsListState = {
  viewState: initialViewState(),
  showDeleteSuccess: false,
}

export const contractsListReducer = (
  state: ContractsListState = initialState,
  action: AnyAction,
): ContractsListState => {
  switch (action.type) {
    case asStarted(ContractsActionType.CONTRACTS_LIST_GET):
      return {
        ...state,
        viewState: startLoading<ContractsList>(state.viewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<ContractsList>(state.viewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<ContractsList>(state.viewState, action.result),
      }
    case asSuccess(ContractsActionType.CONTRACT_REPLACE):
      return {
        ...state,
        viewState: initialViewState(),
      }
    case asSuccess(ContractsActionType.CONTRACT_APPROVE):
      return {
        ...state,
        viewState: initialViewState(),
      }
    case asSuccess(ContractsActionType.CONTRACT_DELETE):
      return {
        ...state,
        showDeleteSuccess: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteSuccess: showAlertForRoute(state.showDeleteSuccess, "contracts", action.payload.location.pathname),
      }
    default:
      return {
        ...state,
      }
  }
}
