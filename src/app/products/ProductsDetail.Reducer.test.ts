import { initialState, productsDetailReducer } from "./ProductsDetail.Reducer"
import { Map } from "immutable"

test("The GET_PRODUCT_BY_ID asStarted action should produce a loading state", () => {
  const actual = productsDetailReducer(initialState, {
    type: "GET_PRODUCT_BY_ID_STARTED",
  })
  expect(actual.getProductViewState.isLoading).toEqual(true)
})

test("The GET_PRODUCT_BY_ID asSuccess action should produce a success state with Product data", () => {
  const actual = productsDetailReducer(initialState, {
    type: "GET_PRODUCT_BY_ID_SUCCESS",
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    result: true,
  })
  expect(actual).toEqual({
    getProductViewState: {
      domainResult: true,
      isLoading: false,
    },
    deleteProductViewState: {
      isLoading: false,
    },
    deletePriceComponentViewState: {
      domainError: {
        __altered: false,
        size: 0,
      },
      domainResult: Map(),
      isLoading: Map(),
    },
    editPriceComponentViewState: {
      isLoading: false,
    },
    showUpdateAlert: false,
    showPriceComponentCreateSuccessAlert: false,
    showPriceComponentUpdateSuccessAlert: false,
  })
})

test("The GET_PRODUCT_BY_ID asError action should produce an error state", () => {
  const actual = productsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "GET_PRODUCT_BY_ID_ERROR",
  })
  expect(actual).toEqual({
    getProductViewState: {
      isLoading: false,
    },
    deleteProductViewState: {
      isLoading: false,
    },
    deletePriceComponentViewState: {
      domainError: Map(),
      domainResult: Map(),
      isLoading: Map(),
    },
    editPriceComponentViewState: {
      isLoading: false,
    },
    showUpdateAlert: false,
    showPriceComponentCreateSuccessAlert: false,
    showPriceComponentUpdateSuccessAlert: false,
  })
})

test("The PRODUCT_DELETE asStarted action should produce a loading state", () => {
  const actual = productsDetailReducer(initialState, {
    type: "PRODUCT_DELETE_STARTED",
  })
  expect(actual.deleteProductViewState.isLoading).toEqual(true)
})

test("The PRODUCT_DELETE asSuccess action should produce a success state", () => {
  const actual = productsDetailReducer(initialState, {
    type: "PRODUCT_DELETE_SUCCESS",
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    result: true,
  })
  expect(actual).toEqual({
    getProductViewState: {
      isLoading: false,
    },
    deleteProductViewState: {
      domainResult: true,
      isLoading: false,
    },
    deletePriceComponentViewState: {
      domainError: Map(),
      domainResult: Map(),
      isLoading: Map(),
    },
    editPriceComponentViewState: {
      isLoading: false,
    },
    showUpdateAlert: false,
    showPriceComponentCreateSuccessAlert: false,
    showPriceComponentUpdateSuccessAlert: false,
  })
})

test("The PRODUCT_DELETE asError action should produce an error state", () => {
  const actual = productsDetailReducer(initialState, {
    productId: "ec9ba6cf-364e-452f-a6a5-1be94344e161",
    type: "PRODUCT_DELETE_ERROR",
  })
  expect(actual).toEqual({
    getProductViewState: {
      isLoading: false,
    },
    deleteProductViewState: {
      isLoading: false,
    },
    deletePriceComponentViewState: {
      domainError: Map(),
      domainResult: Map(),
      isLoading: Map(),
    },
    editPriceComponentViewState: {
      isLoading: false,
    },
    showUpdateAlert: false,
    showPriceComponentCreateSuccessAlert: false,
    showPriceComponentUpdateSuccessAlert: false,
  })
})
