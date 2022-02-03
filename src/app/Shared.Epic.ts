import { mergeMap, map, catchError, startWith, filter } from "rxjs/operators"
import { asSuccess, asError, asStarted, asSessionTimeout } from "./Shared.Reducer"
import { AnyAction } from "redux"
import { Observable, of } from "rxjs"
import { DomainResponse } from "../domain/Domain.Response"
import { Epic } from "redux-observable"
import { translateErrorCode } from "./App.i18n"

export function createEpic<D>(
  actionType: string,
  observable: (action: AnyAction) => Observable<DomainResponse<D>>,
): Epic<AnyAction> {
  return (action$: Observable<AnyAction>) =>
    action$.pipe(
      filter((action) => action.type === actionType),
      mergeMap((action) =>
        observable(action).pipe(
          map((response) => ({
            ...action,
            ...responseAction(actionType, response),
          })),
          catchError(() =>
            of(genericErrorAction(action.type)).pipe(
              map((errorAction) => ({
                ...action,
                ...errorAction,
              })),
            ),
          ),
          startWith({
            ...action,
            ...startedAction(actionType),
          }),
        ),
      ),
    )
}

const startedAction = (actionType: string): AnyAction => {
  return {
    type: asStarted(actionType),
  }
}

function responseAction<T>(actionType: string, dataResponse: DomainResponse<T>) {
  switch (dataResponse.type) {
    case "ok":
      return {
        type: asSuccess(actionType),
        result: dataResponse.result,
      }
    case "error":
      if (dataResponse.error?.code === "SESSION_EXPIRED") {
        return {
          type: asSessionTimeout(actionType),
        }
      }
      return {
        type: asError(actionType),
        result: {
          code: dataResponse.error?.code ?? "",
          message: translateErrorCode(dataResponse.error?.code, dataResponse.error?.message),
        },
      }
    default:
      return genericErrorAction(actionType)
  }
}
const genericErrorAction = (actionType: string): AnyAction => {
  return {
    type: asError(actionType),
    result: {
      code: "GENERIC_FATAL_ERROR",
      message: translateErrorCode("GENERIC_FATAL_ERROR"),
    },
  }
}
