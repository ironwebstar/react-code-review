import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ContractUpsert } from "../../domain/contracts/Contracts.Models"
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
import { ContractsActionType } from "./Contracts.Epic"

export interface ContractsUpdateState {
  getViewState: ViewState<ContractUpsert>
  updateViewState: ViewState<boolean>
}

export const initialState: ContractsUpdateState = {
  getViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const contractsUpdateReducer = (state: ContractsUpdateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(ContractsActionType.CONTRACTS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: startLoading<ContractUpsert>(state.getViewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainResult<ContractUpsert>(state.getViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<ContractUpsert>(state.getViewState, action.result),
      }
    case asStarted(ContractsActionType.CONTRACTS_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<boolean>(state.updateViewState, action.result),
      }
    case LOCATION_CHANGE: {
      return initialState
    }
    default:
      return {
        ...state,
      }
  }
}
