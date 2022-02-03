import { Observable, from, map } from "rxjs"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"

export const changePassword = (
  currentPassword: string,
  newPassword: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(
    from(deps.adminProfileApi.updateAdminPassword({ currentPassword, newPassword }, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
