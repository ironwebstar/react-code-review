import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfilesCreateComponent } from "./ProfilesCreate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createProfile: (profile: ProfileUpsert) => {
      dispatch({
        type: ProfilesActionType.PROFILES_CREATE,
        profile: profile,
      })
    },
    navigateToProfile: (profileId: string) => {
      dispatch(push(`/profiles/${profileId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesCreateComponent)
