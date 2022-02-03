import { connect } from "react-redux"
import { ProfilesManagerSelectionComponent } from "./ProfilesManagerSelection.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ProfilesActionType } from "./Profiles.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesManagerSelection,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getManagerProfiles: () => {
      dispatch({
        type: ProfilesActionType.PROFILES_GET_MANAGER_LIST,
        page: 1,
        limit: 100,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesManagerSelectionComponent)
