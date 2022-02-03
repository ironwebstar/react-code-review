import { initialState, productsUpdateReducer } from "./ProductsUpdate.Reducer"

test("The PRODUCT_UPDATE asStarted action should produce a loading state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_UPDATE_STARTED",
  })
  expect(result.updateViewState.isLoading).toEqual(true)
})

test("The PRODUCT_UPDATE asSuccess action should produce a success state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_UPDATE_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    updateViewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
    updateByIdViewState: {
      isLoading: false,
    },
  })
})

test("The PRODUCT_UPDATE asError action should produce an error state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_UPDATE_ERROR",
  })
  expect(result).toEqual({
    updateViewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
    updateByIdViewState: {
      isLoading: false,
    },
  })
})

test("The PRODUCT_GET_UPDATE_BY_ID asStarted action should produce a loading state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_GET_UPDATE_BY_ID_STARTED",
  })
  expect(result.updateByIdViewState.isLoading).toEqual(true)
})

test("The PRODUCT_GET_UPDATE_BY_ID asSuccess action should produce a success state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_GET_UPDATE_BY_ID_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    updateViewState: {
      domainError: undefined,
      isLoading: false,
    },
    updateByIdViewState: {
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The PRODUCT_GET_UPDATE_BY asError action should produce an error state", () => {
  const result = productsUpdateReducer(initialState, {
    type: "PRODUCT_GET_UPDATE_BY_ERROR",
  })
  expect(result).toEqual({
    updateViewState: {
      isLoading: false,
    },
    updateByIdViewState: {
      isLoading: false,
      domainError: undefined,
    },
  })
})

test("The LOCATION_CHANGE type action should produce a successful navigation deletion state", () => {
  const actual = productsUpdateReducer(initialState, {
    payload: {
      location: {
        pathname: "/products",
      },
    },
    type: "@@router/LOCATION_CHANGE",
    result: true,
  })
  expect(actual).toEqual({
    updateByIdViewState: {
      isLoading: false,
    },
    updateViewState: {
      isLoading: false,
    },
  })
})
