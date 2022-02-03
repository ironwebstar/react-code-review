import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfilesDetailComponent } from "./ProfilesDetail.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProfileById: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_GET_BY_ID,
        profileId: profileId,
      })
    },
    deleteProfileById: (profileId: string, dialogBody: string, dialogCta: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: ProfilesActionType.PROFILES_DELETE_BY_ID,
          profileId: profileId,
        },
      })
    },
    directDeleteProfile: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_DELETE_BY_ID,
        profileId: profileId,
      })
    },
    createProfileLogin: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_CREATE_LOGIN_BY_ID,
        profileId: profileId,
      })
    },
    activateProfile: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_ACTIVATE,
        profileId: profileId,
      })
    },
    deactivateProfile: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_DEACTIVATE,
        profileId: profileId,
      })
    },
    resetPassword: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_RESET_PASSWORD,
        profileId: profileId,
      })
    },
    navigateToUpdateProfile: (profileId: string) => {
      dispatch(push(`/profiles/${profileId}/update`))
    },
    navigateToCreateZev: (profileId: string) => {
      dispatch(push(`/zevs/create/forprofile/${profileId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesDetailComponent)
