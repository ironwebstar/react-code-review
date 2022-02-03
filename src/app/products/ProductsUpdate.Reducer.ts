import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ProductUpsert } from "../../domain/products/Products.Model"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { ProductsActionType } from "./Products.Epic"

export interface ProductsUpdateState {
  updateByIdViewState: ViewState<ProductUpsert>
  updateViewState: ViewState<boolean>
}

export const initialState: ProductsUpdateState = {
  updateByIdViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const productsUpdateReducer = (
  state: ProductsUpdateState = initialState,
  action: AnyAction,
): ProductsUpdateState => {
  switch (action.type) {
    case asStarted(ProductsActionType.PRODUCT_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<boolean>(state.updateViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<boolean>(state.updateViewState, action.result),
      }
    case asError(ProductsActionType.PRODUCT_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<boolean>(state.updateViewState, action.result),
      }
    case asStarted(ProductsActionType.PRODUCT_GET_UPDATE_BY_ID):
      return {
        ...state,
        updateByIdViewState: startLoading<ProductUpsert>(state.updateByIdViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_GET_UPDATE_BY_ID):
      return {
        ...state,
        updateByIdViewState: withDomainResult<ProductUpsert>(state.updateByIdViewState, action.result),
      }
    case asError(ProductsActionType.PRODUCT_GET_UPDATE_BY_ID):
      return {
        ...state,
        updateByIdViewState: withDomainError<ProductUpsert>(state.updateByIdViewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
      }
    default:
      return {
        ...state,
      }
  }
}
