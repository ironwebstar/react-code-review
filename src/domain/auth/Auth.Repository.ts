import { from, map, Observable, of } from "rxjs"
import { createOkResponse, DomainResponse } from "../Domain.Response"
import { apiCall } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"

export const createAdminSession = (
  emailAddress: string,
  password: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(
    from(
      deps.adminSessionApi.createAdminSession({
        username: emailAddress,
        password: password,
      }),
    ).pipe(
      map((res) => {
        deps.cookie.createCookieBearerToken(deps.config.appName, res.data.token, document)
        deps.cookie.createCookieRefreshToken(deps.config.appName, res.data.refreshToken, document)
      }),
      map(() => true),
    ),
  )

export const refreshAdminSession = (deps: DomainDependencies): Observable<DomainResponse<boolean>> =>
  apiCall(
    from(
      deps.adminSessionApi.refreshAdminSession({
        refreshToken: deps.cookie.readCookieRefreshToken(deps.config.appName, document),
      }),
    ).pipe(
      map((res) => {
        deps.cookie.createCookieBearerToken(deps.config.appName, res.data.token, document)
        deps.cookie.createCookieRefreshToken(deps.config.appName, res.data.refreshToken, document)
      }),
      map(() => true),
    ),
  )

export const deleteAdminSession = (deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  deps.cookie.removeCookies(deps.config.appName, document)
  return of(createOkResponse(true))
}

export const forgottenPassword = (
  emailAddress: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(from(deps.adminSessionApi.adminForgotPassword(emailAddress)).pipe(map(() => true)))

export const newAccountPassword = (
  token: string,
  newPassword: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(from(deps.adminSessionApi.adminNewAccountPassword(token, { password: newPassword })).pipe(map(() => true)))
