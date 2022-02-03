import { contractsDetailReducer, initialState } from "./ContractsDetail.Reducer"

test("The CONTRACT_GET_BY_ID asStarted action should produce a loading state", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_GET_BY_ID_STARTED",
  })
  expect(actual.getViewState.isLoading).toEqual(true)
})

test("The CONTRACT_GET_BY_ID asSuccess action should produce a success state with Product data", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_GET_BY_ID_SUCCESS",
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    result: true,
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      domainResult: true,
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_GET_BY_ID asError action should produce an error state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_GET_BY_ID_ERROR",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_REPLACE asStarted action should produce a loading state", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_REPLACE_STARTED",
  })
  expect(actual.replaceContractViewState.isLoading).toEqual(true)
})

test("The CONTRACT_REPLACE asSuccess action should produce an success state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_REPLACE_SUCCESS",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: true,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_REPLACE asError action should produce an success state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_REPLACE_ERROR",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_APPROVE asStarted action should produce a loading state", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_APPROVE_STARTED",
  })
  expect(actual.approveContractViewState.isLoading).toEqual(true)
})

test("The CONTRACT_APPROVE asSuccess action should produce an success state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_APPROVE_SUCCESS",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_APPROVE asError action should produce an success state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_APPROVE_ERROR",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_DELETE asStarted action should produce a loading state", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_DELETE_STARTED",
  })
  expect(actual.deleteContractViewState.isLoading).toEqual(true)
})

test("The CONTRACT_DELETE asSuccess action should produce a success state", () => {
  const actual = contractsDetailReducer(initialState, {
    type: "CONTRACT_DELETE_SUCCESS",
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    result: true,
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      domainResult: true,
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})

test("The CONTRACT_DELETE asError action should produce an error state", () => {
  const actual = contractsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "CONTRACT_DELETE_ERROR",
  })
  expect(actual).toEqual({
    approveContractViewState: {
      isLoading: false,
    },
    deleteContractViewState: {
      isLoading: false,
    },
    getViewState: {
      isLoading: false,
    },
    replaceContractViewState: {
      isLoading: false,
    },
    showReplaceAlert: false,
    showUpdateAlert: false,
  })
})
