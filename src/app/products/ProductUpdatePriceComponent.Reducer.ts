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
import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
import { ProductsActionType } from "./Products.Epic"
import { ProductPriceComponentUpsert } from "../../domain/products/Products.Model"

export interface ProductUpdatePriceComponentState {
  getProductPriceComponentViewState: ViewState<ProductPriceComponentUpsert>
  updateProductPriceComponentViewState: ViewState<string>
}

const initialState: ProductUpdatePriceComponentState = {
  getProductPriceComponentViewState: initialViewState(),
  updateProductPriceComponentViewState: initialViewState(),
}

export const productUpdatePriceComponentReducer = (
  state: ProductUpdatePriceComponentState = initialState,
  action: AnyAction,
): ProductUpdatePriceComponentState => {
  switch (action.type) {
    case asStarted(ProductsActionType.GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID):
      return {
        ...state,
        getProductPriceComponentViewState: startLoading<ProductPriceComponentUpsert>(
          state.getProductPriceComponentViewState,
        ),
      }
    case asSuccess(ProductsActionType.GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID):
      return {
        ...state,
        getProductPriceComponentViewState: withDomainResult<ProductPriceComponentUpsert>(
          state.getProductPriceComponentViewState,
          action.result,
        ),
      }
    case asError(ProductsActionType.GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID):
      return {
        ...state,
        getProductPriceComponentViewState: withDomainError<ProductPriceComponentUpsert>(
          state.getProductPriceComponentViewState,
          action.result,
        ),
      }
    case asStarted(ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateProductPriceComponentViewState: startLoading<string>(state.updateProductPriceComponentViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateProductPriceComponentViewState: withDomainResult<string>(
          state.updateProductPriceComponentViewState,
          action.result,
        ),
      }
    case asError(ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE):
      return {
        ...state,
        updateProductPriceComponentViewState: withDomainError<string>(
          state.updateProductPriceComponentViewState,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
