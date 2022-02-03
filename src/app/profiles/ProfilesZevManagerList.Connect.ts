import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfilesZevManagerListComponent } from "./ProfilesZevManagerList.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesManagerList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevManagerProfiles: (zevId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_GET_MANAGER_LIST_BY_ZEV_ID,
        zevId: zevId,
      })
    },
    navigateToProfile: (profileId: string) => {
      dispatch(push(`/profiles/${profileId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesZevManagerListComponent)
