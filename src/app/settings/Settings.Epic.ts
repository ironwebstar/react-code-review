import { createEpic } from "../Shared.Epic"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { changePassword } from "../../domain/settings/Settings.Repository"

export enum SettingsActionType {
  SETTINGS_CHANGE_PASSWORD = "SETTINGS_CHANGE_PASSWORD",
}

export const settingsEpic = [
  createEpic<boolean>(SettingsActionType.SETTINGS_CHANGE_PASSWORD, (action) =>
    changePassword(action.currentPassword, action.newPassword, DOMAIN_DEPENDENCIES),
  ),
]
