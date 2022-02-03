import {
  createAdminSession,
  forgottenPassword,
  newAccountPassword,
  refreshAdminSession,
} from "../../domain/auth/Auth.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"

export enum AuthActionType {
  AUTH_CREATE_SESSION = "AUTH_CREATE_SESSION",
  AUTH_REFRESH_SESSION = "AUTH_REFRESH_SESSION",
  AUTH_FORGOTTEN_PASSWORD = "AUTH_FORGOTTEN_PASSWORD",
  AUTH_NEW_ACCOUNT_PASSWORD = "AUTH_NEW_ACCOUNT_PASSWORD",
}

export const authEpics = [
  createEpic<boolean>(AuthActionType.AUTH_REFRESH_SESSION, () => refreshAdminSession(DOMAIN_DEPENDENCIES)),
  createEpic<boolean>(AuthActionType.AUTH_CREATE_SESSION, (action) =>
    createAdminSession(action.emailAddress, action.password, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(AuthActionType.AUTH_FORGOTTEN_PASSWORD, (action) =>
    forgottenPassword(action.emailAddress, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(AuthActionType.AUTH_NEW_ACCOUNT_PASSWORD, (action) =>
    newAccountPassword(action.token, action.newPassword, DOMAIN_DEPENDENCIES),
  ),
]
