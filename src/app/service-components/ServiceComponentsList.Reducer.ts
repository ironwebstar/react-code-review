import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ServiceComponentsList } from "../../domain/service-components/ServiceComponents.Model"
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
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"

export interface ServiceComponentsListState {
  viewState: ViewState<ServiceComponentsList>
}

const initialState: ServiceComponentsListState = {
  viewState: initialViewState(),
}

export const serviceComponentsListReducer = (
  state: ServiceComponentsListState = initialState,
  action: AnyAction,
): ServiceComponentsListState => {
  switch (action.type) {
    case asStarted(ServiceComponentsActionType.SERVICE_COMPONENTS_GET):
      return {
        ...state,
        viewState: startLoading<ServiceComponentsList>(state.viewState),
      }
    case asSuccess(ServiceComponentsActionType.SERVICE_COMPONENTS_GET):
      return {
        ...state,
        viewState: withDomainResult<ServiceComponentsList>(state.viewState, action.result),
      }
    case asError(ServiceComponentsActionType.SERVICE_COMPONENTS_GET):
      return {
        ...state,
        viewState: withDomainError<ServiceComponentsList>(state.viewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return { ...state }
  }
}
