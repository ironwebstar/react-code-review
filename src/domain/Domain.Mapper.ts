import { DomainResponse, createErrorResponse } from "./Domain.Response"
import { AjaxError } from "rxjs/ajax"
import { Observable, of } from "rxjs"

export type JsonAdapter<J, D> = (json: J) => D

export type ResponseAdapter<J, D> = (json: J) => Observable<DomainResponse<D>>

export function mapDomainError<D>(error: AjaxError): Observable<DomainResponse<D>> {
  try {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (error.response.data.status === 401 && error.response.data.error === "Unauthorized") {
          return of(createErrorResponse<D>("SESSION_EXPIRED", error.response.data.message))
        } else if (!error.response.data.code) {
          return of(createErrorResponse<D>("GENERIC_401", error.response.data.message))
        } else {
          return of(createErrorResponse<D>(error.response.data.code, error.response.data.message))
        }
      } else {
        return of(createErrorResponse<D>(error.response.data.code, error.response.data.message))
      }
    }
    return of(createErrorResponse<D>("GENERIC_FATAL_ERROR", error.message))
  } catch (e: unknown) {
    return of(createErrorResponse<D>("GENERIC_FATAL_ERROR", `Something went wrong... ${e}`))
  }
}

export function santiseEmptyValues<T>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== "" && v !== 1 && v !== undefined)
      .map(([k, v]) => [k, v === Object(v) ? santiseEmptyValues(v) : v]),
  ) as T
}
