import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ProductList } from "../../domain/products/Products.Model"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  showAlertForRoute,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { ProductsActionType } from "./Products.Epic"

export interface ProductsListState {
  viewState: ViewState<ProductList>
  showDeleteAlert: boolean
}

export const initialState: ProductsListState = {
  viewState: initialViewState(),
  showDeleteAlert: false,
}

export const productsListReducer = (state: ProductsListState = initialState, action: AnyAction): ProductsListState => {
  switch (action.type) {
    case asStarted(ProductsActionType.GET_PRODUCTS):
      return {
        ...state,
        viewState: startLoading<ProductList>(state.viewState),
      }
    case asSuccess(ProductsActionType.GET_PRODUCTS):
      return {
        ...state,
        viewState: withDomainResult<ProductList>(state.viewState, action.result),
      }
    case asError(ProductsActionType.GET_PRODUCTS):
      return {
        ...state,
        viewState: withDomainError<ProductList>(state.viewState, action.result),
      }
    case asSuccess(ProductsActionType.PRODUCT_DELETE):
      return {
        ...state,
        viewState: withDomainResult<ProductList>(state.viewState, action.result),
        showDeleteAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteAlert: showAlertForRoute(state.showDeleteAlert, "products", action.payload.location.pathname),
      }
    default:
      return { ...state }
  }
}
