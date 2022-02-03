import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { StatusType } from "../../domain/Domain.Model"
import { ZevDetail } from "../../domain/zevs/ZevsDetail.Model"
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
import { ZevsActionType } from "./Zevs.Epic"

export interface ZevsDetailState {
  getZevViewState: ViewState<ZevDetail>
  deleteZevViewState: ViewState<boolean>
  activateZevViewState: ViewState<boolean>
  deactivateZevViewState: ViewState<boolean>
  createInvoiceViewState: ViewState<string>
  showZevUpdatedSuccessAlert: boolean
}

const initialState: ZevsDetailState = {
  getZevViewState: initialViewState(),
  deleteZevViewState: initialViewState(),
  activateZevViewState: initialViewState(),
  deactivateZevViewState: initialViewState(),
  createInvoiceViewState: initialViewState(),
  showZevUpdatedSuccessAlert: false,
}

export const zevsDetailReducer = (state: ZevsDetailState = initialState, action: AnyAction): ZevsDetailState => {
  switch (action.type) {
    case asStarted(ZevsActionType.ZEVS_GET_BY_ID):
      return {
        ...state,
        getZevViewState: startLoading<ZevDetail>(state.getZevViewState),
        deleteZevViewState: initialViewState(),
        activateZevViewState: initialViewState(),
        deactivateZevViewState: initialViewState(),
      }
    case asSuccess(ZevsActionType.ZEVS_GET_BY_ID):
      return {
        ...state,
        getZevViewState: withDomainResult<ZevDetail>(state.getZevViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_GET_BY_ID):
      return {
        ...state,
        getZevViewState: withDomainError<ZevDetail>(state.getZevViewState, action.result),
      }
    case asStarted(ZevsActionType.ZEVS_DELETE_BY_ID):
      return {
        ...state,
        deleteZevViewState: startLoading<boolean>(state.deleteZevViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_DELETE_BY_ID):
      return {
        ...state,
        deleteZevViewState: withDomainResult<boolean>(state.deleteZevViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_DELETE_BY_ID):
      return {
        ...state,
        deleteZevViewState: withDomainError<boolean>(state.deleteZevViewState, action.result),
      }
    case asStarted(ZevsActionType.ZEVS_ACTIVATE_BY_ID):
      return {
        ...state,
        activateZevViewState: startLoading<boolean>(state.activateZevViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_ACTIVATE_BY_ID):
      return {
        ...state,
        activateZevViewState: withDomainResult<boolean>(state.deactivateZevViewState, action.result),
        getZevViewState: {
          ...state.getZevViewState,
          domainResult: state.getZevViewState.domainResult && {
            ...state.getZevViewState.domainResult,
            statusType: StatusType.ACTIVE,
          },
        },
      }
    case asError(ZevsActionType.ZEVS_ACTIVATE_BY_ID):
      return {
        ...state,
        activateZevViewState: withDomainError<boolean>(state.activateZevViewState, action.result),
      }
    case asStarted(ZevsActionType.ZEVS_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateZevViewState: startLoading<boolean>(state.deactivateZevViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateZevViewState: withDomainResult<boolean>(state.deactivateZevViewState, action.result),
        getZevViewState: {
          ...state.getZevViewState,
          domainResult: state.getZevViewState.domainResult && {
            ...state.getZevViewState.domainResult,
            statusType: StatusType.INACTIVE,
          },
        },
      }
    case asError(ZevsActionType.ZEVS_DEACTIVATE_BY_ID):
      return {
        ...state,
        deactivateZevViewState: withDomainError<boolean>(state.deactivateZevViewState, action.result),
      }
    case asSuccess(ZevsActionType.ZEVS_UPDATE):
      return {
        ...state,
        showZevUpdatedSuccessAlert: true,
      }
    case asStarted(ZevsActionType.ZEVS_CREATE_INVOICE):
      return {
        ...state,
        createInvoiceViewState: startLoading<string>(state.createInvoiceViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_CREATE_INVOICE):
      return {
        ...state,
        createInvoiceViewState: withDomainResult<string>(state.createInvoiceViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_CREATE_INVOICE):
      return {
        ...state,
        createInvoiceViewState: withDomainError<string>(state.createInvoiceViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
