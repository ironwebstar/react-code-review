import { initialState, productsListReducer } from "./ProductsList.Reducer"

test("The GET_PRODUCTS asStarted action produces a loading state", () => {
  const actual = productsListReducer(initialState, {
    type: "GET_PRODUCTS_STARTED",
  })
  expect(actual.viewState.isLoading).toEqual(true)
})

test("The GET_PRODUCTS asSuccess action should produce a success state with Products data", () => {
  const actual = productsListReducer(initialState, {
    type: "GET_PRODUCTS_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteAlert: false,
    viewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The GET_PRODUCTS asError action should produce an error state", () => {
  const actual = productsListReducer(initialState, {
    type: "GET_PRODUCTS_ERROR",
  })
  expect(actual).toEqual({
    showDeleteAlert: false,
    viewState: {
      domainError: undefined,
      domainResult: undefined,
      isLoading: false,
    },
  })
})

test("The PRODUCT_DELETE asSuccess action should produce a successful deletion state", () => {
  const actual = productsListReducer(initialState, {
    type: "PRODUCT_DELETE_SUCCESS",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteAlert: true,
    viewState: {
      domainError: undefined,
      domainResult: true,
      isLoading: false,
    },
  })
})

test("The LOCATION_CHANGE type action should produce a successful navigation deletion state", () => {
  const actual = productsListReducer(initialState, {
    payload: {
      location: {
        pathname: "/products",
      },
    },
    type: "@@router/LOCATION_CHANGE",
    result: true,
  })
  expect(actual).toEqual({
    showDeleteAlert: false,
    viewState: {
      isLoading: false,
    },
  })
})
