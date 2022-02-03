import { AnyAction } from "redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"
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
import { ServiceComponentsDetailItem } from "../../domain/service-components/ServiceComponents.Model"
import { LOCATION_CHANGE } from "connected-react-router"

export interface ServiceComponentsDetailState {
  viewState: ViewState<ServiceComponentsDetailItem>
  showUpdateAlert: boolean
}

const initialState: ServiceComponentsDetailState = {
  viewState: initialViewState(),
  showUpdateAlert: false,
}

export const serviceComponentsDetailReducer = (
  state: ServiceComponentsDetailState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case asStarted(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<ServiceComponentsDetailItem>(state.viewState),
      }
    case asSuccess(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<ServiceComponentsDetailItem>(state.viewState, action.result),
      }
    case asError(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<ServiceComponentsDetailItem>(state.viewState, action.result),
      }
    case asSuccess(ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showUpdateAlert: showSuccessAlertById(
          state.showUpdateAlert,
          action.payload.location.pathname,
          state.viewState.domainResult?.id,
        ),
      }
    default:
      return {
        ...state,
      }
  }
}
