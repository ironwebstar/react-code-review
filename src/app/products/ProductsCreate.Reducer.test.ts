import { initialState, productsCreateReducer } from "./ProductsCreate.Reducer"

test("The PRODUCT_CREATE asStarted action should produce a loading state", () => {
  const result = productsCreateReducer(initialState, {
    type: "PRODUCT_CREATE_STARTED",
  })
  expect(result.createViewState.isLoading).toEqual(true)
})

test("The PRODUCT_CREATE asSuccess action should produce a success state", () => {
  const result = productsCreateReducer(initialState, {
    type: "PRODUCT_CREATE_SUCCESS",
    result: true,
  })
  expect(result).toEqual({
    createViewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The PRODUCT_CREATE asError action should produce an error state", () => {
  const result = productsCreateReducer(initialState, {
    type: "PRODUCT_CREATE_ERROR",
  })
  expect(result).toEqual({
    createViewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})

test("The LOCATION_CHANGE type action should produce a successful navigation deletion state", () => {
  const actual = productsCreateReducer(initialState, {
    payload: {
      location: {
        pathname: "/products",
      },
    },
    type: "@@router/LOCATION_CHANGE",
    result: true,
  })
  expect(actual).toEqual({
    createViewState: {
      isLoading: false,
    },
  })
})
