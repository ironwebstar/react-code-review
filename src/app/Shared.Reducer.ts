import { Map } from "immutable"
import { DomainError } from "../domain/Domain.Response"

export const asStarted = (actionName: string): string => `${actionName.toUpperCase()}_STARTED`
export const asSuccess = (actionName: string): string => `${actionName.toUpperCase()}_SUCCESS`
export const asError = (actionName: string): string => `${actionName.toUpperCase()}_ERROR`
export const asSessionTimeout = (actionName: string): string => `${actionName.toUpperCase()}_SESSION_TIMEOUT`

/**
 *
 */
export interface ViewState<R> {
  isLoading: boolean
  domainError?: DomainError
  domainResult?: R
}

export function firstViewState<R>(viewState: ViewState<R>) {
  return !viewState.isLoading && !viewState.domainResult && !viewState.domainError
}

export function initialViewState<R>(): ViewState<R> {
  return {
    isLoading: false,
    domainError: undefined,
    domainResult: undefined,
  }
}
export function startLoading<R>(viewState: ViewState<R>): ViewState<R> {
  return {
    ...viewState,
    isLoading: true,
    domainError: undefined,
    domainResult: undefined,
  }
}

export function stopLoading<R>(viewState: ViewState<R>): ViewState<R> {
  return {
    ...viewState,
    isLoading: false,
  }
}

export function withDomainError<R>(viewState: ViewState<R>, result: DomainError): ViewState<R> {
  return {
    ...viewState,
    isLoading: false,
    domainError: result,
    domainResult: undefined,
  }
}

export function withDomainResult<R>(viewState: ViewState<R>, result: R): ViewState<R> {
  return {
    ...viewState,
    isLoading: false,
    domainError: undefined,
    domainResult: result,
  }
}

/**
 *
 */
export interface ViewStateMap<K, R> {
  isLoading: Map<K, boolean>
  domainError: Map<K, DomainError | undefined>
  domainResult: Map<K, R | undefined>
}

export function firstViewStateMap<K, R>(key: K, viewState: ViewStateMap<K, R>) {
  return !viewState.isLoading.get(key) && !viewState.domainResult.has(key) && !viewState.domainError.has(key)
}

export function initialViewStateMap<K, R>(): ViewStateMap<K, R> {
  return {
    isLoading: Map(),
    domainError: Map(),
    domainResult: Map(),
  }
}

export function startLoadingMap<K, R>(key: K, viewState: ViewStateMap<K, R>): ViewStateMap<K, R> {
  return {
    ...viewState,
    isLoading: viewState.isLoading.set(key, true),
    domainError: viewState.domainError.remove(key),
    domainResult: viewState.domainResult.remove(key),
  }
}

export function stopLoadingMap<K, R>(key: K, viewState: ViewStateMap<K, R>): ViewStateMap<K, R> {
  return {
    ...viewState,
    isLoading: viewState.isLoading.set(key, false),
  }
}

export function withDomainErrorMap<K, R>(
  key: K,
  viewState: ViewStateMap<K, R>,
  result: DomainError,
): ViewStateMap<K, R> {
  return {
    ...viewState,
    isLoading: viewState.isLoading.set(key, false),
    domainError: viewState.domainError.set(key, result),
    domainResult: viewState.domainResult.remove(key),
  }
}

export function withDomainResultMap<K, R>(key: K, viewState: ViewStateMap<K, R>, result: R): ViewStateMap<K, R> {
  return {
    ...viewState,
    isLoading: viewState.isLoading.set(key, false),
    domainError: viewState.domainError.set(key, undefined),
    domainResult: viewState.domainResult.set(key, result),
  }
}

export function isLoadingById<K, R>(id: K, viewState: ViewStateMap<K, R>): boolean {
  return viewState.isLoading.get(id) ?? false
}

export function domainErrorById<K, R>(id: K, viewState: ViewStateMap<K, R>): string | undefined {
  return viewState.domainError.get(id)?.message
}

export function domainResultById<K, R>(id: K, viewState: ViewStateMap<K, R>): R | undefined {
  return viewState.domainResult.get(id)
}

/**
 * Only show the success alert when the user navigates back to the details route
 * of the last updated record.
 */
export const showSuccessAlertById = (showAlert: boolean, pathname?: string, id?: string): boolean => {
  return (
    showAlert &&
    id !== undefined &&
    pathname !== undefined &&
    pathname.includes(id) &&
    !pathname.includes("/update") &&
    !pathname.includes("/create")
  )
}

/**
 * Only show the delete success alert when the user navigates to the list route
 * of the last updated record.
 */
export const showAlertForRoute = (showAlert: boolean, section: string, pathname?: string): boolean => {
  return showAlert && pathname !== undefined && pathname.endsWith(section)
}
