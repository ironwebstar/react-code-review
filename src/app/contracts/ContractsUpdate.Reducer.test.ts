import { contractsUpdateReducer, initialState } from "./ContractsUpdate.Reducer"

test("The CONTRACTS_GET_UPDATE_BY_ID asStarted action should produce a loading state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_GET_UPDATE_BY_ID_STARTED",
  })
  expect(result.getViewState.isLoading).toEqual(true)
})

test("The CONTRACTS_GET_UPDATE_BY_ID asSuccess action should produce a success state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_GET_UPDATE_BY_ID_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    getViewState: {
      domainResult: true,
      isLoading: false,
    },
    updateViewState: {
      isLoading: false,
    },
  })
})

test("The CONTRACTS_GET_UPDATE_BY_ID asError action should produce an error state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_GET_UPDATE_BY_ID_ERROR",
  })
  expect(result).toEqual({
    getViewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
    updateViewState: {
      isLoading: false,
    },
  })
})

test("The CONTRACTS_UPDATE asStarted action should produce a loading state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_UPDATE_STARTED",
  })
  expect(result.updateViewState.isLoading).toEqual(true)
})

test("The CONTRACTS_UPDATE asSuccess action should produce a success state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_UPDATE_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    getViewState: {
      isLoading: false,
    },
    updateViewState: {
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The CONTRACTS_UPDATE asError action should produce an error state", () => {
  const result = contractsUpdateReducer(initialState, {
    type: "CONTRACTS_UPDATE_BY_ERROR",
  })
  expect(result).toEqual({
    getViewState: {
      isLoading: false,
    },
    updateViewState: {
      isLoading: false,
    },
  })
})

test("The LOCATION_CHANGE type action should produce a successful navigation deletion state", () => {
  const actual = contractsUpdateReducer(initialState, {
    payload: {
      location: {
        pathname: "/contracts",
      },
    },
    type: "@@router/LOCATION_CHANGE",
    result: true,
  })
  expect(actual).toEqual({
    getViewState: {
      isLoading: false,
    },
    updateViewState: {
      isLoading: false,
    },
  })
})
