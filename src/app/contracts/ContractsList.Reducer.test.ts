import { contractsListReducer, initialState } from "./ContractsList.Reducer"

test("The CONTRACTS_LIST_GET asSuccess action should produce a success state", () => {
  const actual = contractsListReducer(initialState, {
    type: "CONTRACTS_LIST_GET_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteSuccess: false,
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})

test("The CONTRACTS_LIST_GET asError action should produce an error state", () => {
  const actual = contractsListReducer(initialState, {
    type: "CONTRACTS_LIST_GET_ERROR",
  })
  expect(actual).toEqual({
    showDeleteSuccess: false,
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})

test("The CONTRACT_REPLACE asSuccess action should produce a successful replace state", () => {
  const actual = contractsListReducer(initialState, {
    type: "CONTRACT_REPLACE_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteSuccess: false,
    viewState: {
      domainError: undefined,
      isLoading: false,
    },
  })
})

test("The CONTRACT_APPROVE asSuccess action should produce a successful deletion state", () => {
  const actual = contractsListReducer(initialState, {
    type: "CONTRACT_APPROVE_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteSuccess: false,
    viewState: {
      domainError: undefined,
      isLoading: false,
    },
  })
})

test("The CONTRACT_DELETE asSuccess action should produce a successful deletion state", () => {
  const actual = contractsListReducer(initialState, {
    type: "CONTRACT_DELETE_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteSuccess: true,
    viewState: {
      isLoading: false,
    },
  })
})

test("The LOCATION_CHANGE type action should produce a successful navigation deletion state", () => {
  const actual = contractsListReducer(initialState, {
    payload: {
      location: {
        pathname: "/contracts",
      },
    },
    type: "@@router/LOCATION_CHANGE",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteSuccess: false,
    viewState: {
      isLoading: false,
    },
  })
})
