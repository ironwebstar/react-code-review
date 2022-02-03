import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ContractsZevList } from "../../domain/contracts/Contracts.Models"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { ContractsActionType } from "./Contracts.Epic"

export interface ContractsZevListState {
  viewState: ViewState<ContractsZevList>
}

export const initialState: ContractsZevListState = {
  viewState: initialViewState(),
}

export const contractsZevListReducer = (
  viewState: ContractsZevListState = initialState,
  action: AnyAction,
): ContractsZevListState => {
  switch (action.type) {
    case asStarted(ContractsActionType.CONTRACTS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: startLoading<ContractsZevList>(viewState.viewState),
      }
    case asSuccess(ContractsActionType.CONTRACTS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: withDomainResult<ContractsZevList>(viewState.viewState, action.result),
      }
    case asError(ContractsActionType.CONTRACTS_LIST_GET_BY_ZEV_ID):
      return {
        ...viewState,
        viewState: withDomainError<ContractsZevList>(viewState.viewState, action.result),
      }
    case LOCATION_CHANGE: {
      return initialState
    }
    default:
      return {
        ...viewState,
      }
  }
}
