import { AnyAction } from "redux"
import { ServiceComponentsList } from "../../domain/service-components/ServiceComponents.Model"
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
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"

export interface ServiceComponentsSelectionState {
  viewState: ViewState<ServiceComponentsList>
}

const initialState: ServiceComponentsSelectionState = {
  viewState: initialViewState(),
}

export const serviceComponentsSelectionReducer = (
  state: ServiceComponentsSelectionState = initialState,
  action: AnyAction,
): ServiceComponentsSelectionState => {
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
    default:
      return {
        ...state,
      }
  }
}
