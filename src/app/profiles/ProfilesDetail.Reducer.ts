import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
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
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfileDetail, ProfileStatusType } from "../../domain/profiles/Profiles.Model"

export interface ProfilesDetailState {
  viewState: ViewState<ProfileDetail>
  createZevForProfileViewState: ViewState<boolean>
  deleteProfileViewState: ViewState<boolean>
  createProfileLoginViewState: ViewState<boolean>
  activateViewState: ViewState<boolean>
  deactivateViewState: ViewState<boolean>
  resetPasswordViewState: ViewState<boolean>
  showUpdateAlert: boolean
  prevId?: string
}

const initialState: ProfilesDetailState = {
  viewState: initialViewState(),
  createZevForProfileViewState: initialViewState(),
  deleteProfileViewState: initialViewState(),
  createProfileLoginViewState: initialViewState(),
  activateViewState: initialViewState(),
  deactivateViewState: initialViewState(),
  resetPasswordViewState: initialViewState(),
  showUpdateAlert: false,
}

export const profilesDetailReducer = (
  state: ProfilesDetailState = initialState,
  action: AnyAction,
): ProfilesDetailState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_GET_BY_ID):
      return {
        ...state,
        viewState: startLoading<ProfileDetail>(state.viewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainResult<ProfileDetail>(state.viewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_GET_BY_ID):
      return {
        ...state,
        viewState: withDomainError<ProfileDetail>(state.viewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_DELETE_BY_ID):
      return {
        ...state,
        deleteProfileViewState: startLoading<boolean>(state.deleteProfileViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_DELETE_BY_ID):
      return {
        ...state,
        deleteProfileViewState: withDomainResult<boolean>(state.deleteProfileViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_DELETE_BY_ID):
      return {
        ...state,
        deleteProfileViewState: withDomainError<boolean>(state.deleteProfileViewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_CREATE_LOGIN_BY_ID):
      return {
        ...state,
        createProfileLoginViewState: startLoading<boolean>(state.createProfileLoginViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_CREATE_LOGIN_BY_ID):
      return {
        ...state,
        viewState: initialViewState(),
        createProfileLoginViewState: withDomainResult<boolean>(state.createProfileLoginViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_CREATE_LOGIN_BY_ID):
      return {
        ...state,
        createProfileLoginViewState: withDomainError<boolean>(state.createProfileLoginViewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        deactivateViewState: initialViewState(),
        resetPasswordViewState: initialViewState(),
        activateViewState: startLoading<boolean>(state.activateViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            profileStatusType: ProfileStatusType.ACTIVE,
          },
        },
        activateViewState: withDomainResult<boolean>(state.activateViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        activateViewState: withDomainError<boolean>(state.activateViewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        activateViewState: initialViewState(),
        resetPasswordViewState: initialViewState(),
        deactivateViewState: startLoading<boolean>(state.deactivateViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            profileStatusType: ProfileStatusType.BLOCKED,
          },
        },
        deactivateViewState: withDomainResult<boolean>(state.deactivateViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        deactivateViewState: withDomainError<boolean>(state.deactivateViewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_RESET_PASSWORD):
      return {
        ...state,
        activateViewState: initialViewState(),
        deactivateViewState: initialViewState(),
        resetPasswordViewState: startLoading<boolean>(state.resetPasswordViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_RESET_PASSWORD):
      return {
        ...state,
        resetPasswordViewState: withDomainResult<boolean>(state.resetPasswordViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_RESET_PASSWORD):
      return {
        ...state,
        resetPasswordViewState: withDomainError<boolean>(state.resetPasswordViewState, action.result),
      }
    case asSuccess(ProfilesActionType.PROFILES_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        prevId: state.viewState.domainResult?.id ?? state.prevId,
        showUpdateAlert: showSuccessAlertById(state.showUpdateAlert, action.payload.location.pathname, state.prevId),
      }
    default:
      return {
        ...state,
      }
  }
}
