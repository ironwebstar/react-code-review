import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ZevsList } from "../../domain/zevs/ZevsList.Model"
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
import { ZevsActionType } from "./Zevs.Epic"

export interface ZevsListState {
  viewState: ViewState<ZevsList>
  showZevDeletedAlert: boolean
}

const initialState: ZevsListState = {
  viewState: initialViewState(),
  showZevDeletedAlert: false,
}

export const zevsListReducer = (state: ZevsListState = initialState, action: AnyAction): ZevsListState => {
  switch (action.type) {
    case asStarted(ZevsActionType.ZEVS_GET_LIST):
      return {
        ...state,
        viewState: startLoading<ZevsList>(state.viewState),
      }
    case asSuccess(ZevsActionType.ZEVS_GET_LIST):
      return {
        ...state,
        viewState: withDomainResult<ZevsList>(state.viewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_GET_LIST):
      return {
        ...state,
        viewState: withDomainError<ZevsList>(state.viewState, action.result),
      }
    case asSuccess(ZevsActionType.ZEVS_DELETE_BY_ID):
      return {
        ...state,
        viewState: initialViewState(),
        showZevDeletedAlert: true,
      }
    case asSuccess(ZevsActionType.ZEVS_CREATE):
    case asSuccess(ZevsActionType.ZEVS_ACTIVATE_BY_ID):
    case asSuccess(ZevsActionType.ZEVS_DEACTIVATE_BY_ID):
      return {
        ...state,
        viewState: initialViewState(),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showZevDeletedAlert: showAlertForRoute(state.showZevDeletedAlert, "/zevs", action.payload.location.pathname),
      }
    default:
      return {
        ...state,
      }
  }
}
