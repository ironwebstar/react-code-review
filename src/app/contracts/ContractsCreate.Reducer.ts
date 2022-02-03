import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ContractProduct } from "../../domain/contracts/Contracts.Models"
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

export interface ContractsCreateState {
  productsViewState: ViewState<ContractProduct[]>
  createViewState: ViewState<boolean>
}

export const initialState: ContractsCreateState = {
  productsViewState: initialViewState(),
  createViewState: initialViewState(),
}

export const contractsCreateReducer = (state: ContractsCreateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case asStarted(ContractsActionType.CONTRACTS_CREATE):
      return {
        ...state,
        createViewState: startLoading<boolean>(state.createViewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_CREATE):
      return {
        ...state,
        createViewState: withDomainResult<boolean>(state.createViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_CREATE):
      return {
        ...state,
        createViewState: withDomainError<boolean>(state.createViewState, action.result),
      }
    case asStarted(ContractsActionType.CONTRACTS_GET_PRODUCTS):
      return {
        ...state,
        productsViewState: startLoading<ContractProduct[]>(state.productsViewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_GET_PRODUCTS):
      return {
        ...state,
        productsViewState: withDomainResult<ContractProduct[]>(state.productsViewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_GET_PRODUCTS):
      return {
        ...state,
        productsViewState: withDomainError<ContractProduct[]>(state.productsViewState, action.result),
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
