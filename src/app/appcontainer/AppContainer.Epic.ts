import { deleteAdminSession } from "../../domain/auth/Auth.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"

export enum AppContainerActionType {
  APP_CONTAINER_LOGOUT = "APP_CONTAINER_LOGOUT",
  APP_CONTAINER_CONFIRM_DIALOG_SHOW = "APP_CONTAINER_CONFIRM_DIALOG_SHOW",
  APP_CONTAINER_CONFIRM_DIALOG_HIDE = "APP_CONTAINER_CONFIRM_DIALOG_HIDE",
}

export const appContainerEpics = [
  createEpic<boolean>(AppContainerActionType.APP_CONTAINER_LOGOUT, () => deleteAdminSession(DOMAIN_DEPENDENCIES)),
]
