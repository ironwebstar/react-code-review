import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ZevsUpsert } from "../../domain/zevs/ZevsUpsert.Model"
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

export interface ZevsUpdateState {
  getZevUpdateViewState: ViewState<ZevsUpsert>
  updateZevViewState: ViewState<ZevDetail>
}

const initialState: ZevsUpdateState = {
  getZevUpdateViewState: initialViewState(),
  updateZevViewState: initialViewState(),
}

export const zevsUpdateReducer = (state: ZevsUpdateState = initialState, action: AnyAction): ZevsUpdateState => {
  switch (action.type) {
    case asStarted(ZevsActionType.ZEVS_UPDATE):
      return {
        ...state,
        updateZevViewState: startLoading<ZevDetail>(state.updateZevViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_UPDATE):
      return {
        ...state,
        updateZevViewState: withDomainResult<ZevDetail>(state.updateZevViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_UPDATE):
      return {
        ...state,
        updateZevViewState: withDomainError<ZevDetail>(state.updateZevViewState, action.result),
      }
    case asStarted(ZevsActionType.ZEVS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getZevUpdateViewState: startLoading<ZevsUpsert>(state.getZevUpdateViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getZevUpdateViewState: withDomainResult<ZevsUpsert>(state.getZevUpdateViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_GET_UPDATE_BY_ID):
      return {
        ...state,
        getZevUpdateViewState: withDomainError<ZevsUpsert>(state.getZevUpdateViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
