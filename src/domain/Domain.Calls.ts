import { AxiosResponseHeaders } from "axios"
import { from, Observable } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { DomainDependencies } from "./Domain.Dependencies"
import { mapDomainError } from "./Domain.Mapper"
import { createOkResponse, DomainResponse } from "./Domain.Response"

export function apiCall<D>(call: Observable<D>): Observable<DomainResponse<D>> {
  return from(call).pipe(
    map((domainModel) => createOkResponse(domainModel)),
    catchError((e) => mapDomainError<D>(e)),
  )
}

export const apiHeaders = (deps: DomainDependencies) => {
  const authToken = deps.cookie.readCookieBearerToken(deps.config.appName, document)
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}

export const fileAttachmentName = (headers: AxiosResponseHeaders) => {
  const disposition = headers["content-disposition"]
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)
    if (matches !== null && matches[1]) {
      return matches[1].replace(/['"]/g, "").replace(/^_+/g, "")
    }
  }
  return "Document"
}

export const fileAttachmentDownload = (fileName: string, blob: Blob) => {
  const link = document.createElement("a")
  const obj = window.URL.createObjectURL(blob)
  link.href = obj
  link.download = fileName
  link.click()
  link.remove()
  setTimeout(() => window.URL.revokeObjectURL(obj), 100)
}
