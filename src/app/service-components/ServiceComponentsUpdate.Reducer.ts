import { AnyAction } from "redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"
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
import { LOCATION_CHANGE } from "connected-react-router"
import { ServiceComponentsDetailItem } from "../../domain/service-components/ServiceComponents.Model"

export interface ServiceComponentsUpdateState {
  getViewState: ViewState<ServiceComponentsDetailItem>
  updateViewState: ViewState<boolean>
}

const initialState: ServiceComponentsUpdateState = {
  getViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const serviceComponentsUpdateReducer = (
  state: ServiceComponentsUpdateState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case asStarted(ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<boolean>(state.updateViewState, action.result),
      }
    case asStarted(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        getViewState: startLoading<ServiceComponentsDetailItem>(state.getViewState),
      }
    case asSuccess(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        getViewState: withDomainResult<ServiceComponentsDetailItem>(state.getViewState, action.result),
      }
    case asError(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        getViewState: withDomainError<ServiceComponentsDetailItem>(state.getViewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        getViewState: initialViewState<ServiceComponentsDetailItem>(),
        updateViewState: initialViewState<boolean>(),
      }
    default:
      return {
        ...state,
      }
  }
}
