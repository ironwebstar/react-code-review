import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { SettingsActionType } from "./Settings.Epic"
import { SettingsChangePasswordComponent } from "./SettingsChangePassword.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.settingsChangePassword,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    changePassword: (currentPassword: string, newPassword: string) => {
      dispatch({
        type: SettingsActionType.SETTINGS_CHANGE_PASSWORD,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsChangePasswordComponent)
