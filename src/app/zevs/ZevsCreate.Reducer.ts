import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
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
import { ZevPrefillProfile } from "../../domain/zevs/ZevsDetail.Model"

export interface ZevsCreateState {
  viewState: ViewState<string>
  profilePrefillViewState: ViewState<ZevPrefillProfile>
}

const initialState: ZevsCreateState = {
  viewState: initialViewState(),
  profilePrefillViewState: initialViewState(),
}

export const zevsCreateReducer = (state: ZevsCreateState = initialState, action: AnyAction): ZevsCreateState => {
  switch (action.type) {
    case asStarted(ZevsActionType.ZEVS_CREATE):
      return {
        ...state,
        viewState: startLoading<string>(state.viewState),
      }
    case asSuccess(ZevsActionType.ZEVS_CREATE):
      return {
        ...state,
        viewState: withDomainResult<string>(state.viewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_CREATE):
      return {
        ...state,
        viewState: withDomainError<string>(state.viewState, action.result),
      }
    case asStarted(ZevsActionType.ZEVS_GET_PROFILE_PREFILL):
      return {
        ...state,
        profilePrefillViewState: startLoading<ZevPrefillProfile>(state.profilePrefillViewState),
      }
    case asSuccess(ZevsActionType.ZEVS_GET_PROFILE_PREFILL):
      return {
        ...state,
        profilePrefillViewState: withDomainResult<ZevPrefillProfile>(state.profilePrefillViewState, action.result),
      }
    case asError(ZevsActionType.ZEVS_GET_PROFILE_PREFILL):
      return {
        ...state,
        profilePrefillViewState: withDomainError<ZevPrefillProfile>(state.profilePrefillViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
