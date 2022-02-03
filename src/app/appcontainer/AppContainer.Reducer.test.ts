import { appContainerReducer, initialState } from "./AppContainer.Reducer"

test("The AUTH_REFRESH_SESSION started action produces a loading state", () => {
  const result = appContainerReducer(initialState, {
    type: "AUTH_REFRESH_SESSION_STARTED",
  })
  expect(result.viewState.isLoading).toEqual(true)
})

test("The AUTH_REFRESH_SESSION success action produces an authenticated state", () => {
  const result = appContainerReducer(initialState, {
    type: "AUTH_REFRESH_SESSION_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    sessionExpired: false,
    viewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The AUTH_CREATE_SESSION error action produces an unauthenticated state", () => {
  const result = appContainerReducer(initialState, {
    type: "AUTH_CREATE_SESSION_ERROR",
  })
  expect(result).toEqual({
    sessionExpired: false,
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})

test("The AUTH_REFRESH_SESSION error action produces an unauthenticated state", () => {
  const result = appContainerReducer(initialState, {
    type: "AUTH_REFRESH_SESSION_ERROR",
  })
  expect(result).toEqual({
    sessionExpired: false,
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})
