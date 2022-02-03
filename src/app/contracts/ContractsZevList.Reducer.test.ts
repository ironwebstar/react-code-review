import { contractsZevListReducer, initialState } from "./ContractsZevList.Reducer"

test("The CONTRACTS_LIST_GET_BY_ZEV_ID asStarted action should produce a loading state", () => {
  const result = contractsZevListReducer(initialState, {
    type: "CONTRACTS_LIST_GET_BY_ZEV_ID_STARTED",
  })
  expect(result.viewState.isLoading).toEqual(true)
})

test("The CONTRACTS_LIST_GET_BY_ZEV_ID asSuccess action should produce a success state", () => {
  const actual = contractsZevListReducer(initialState, {
    type: "CONTRACTS_LIST_GET_BY_ZEV_ID_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    viewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The CONTRACTS_LIST_GET_BY_ZEV_ID asError action should produce an error state", () => {
  const actual = contractsZevListReducer(initialState, {
    type: "CONTRACTS_LIST_GET_BY_ZEV_ID_ERROR",
  })
  expect(actual).toEqual({
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})
