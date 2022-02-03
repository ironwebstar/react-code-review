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

export interface ProductCreatePriceComponentState {
  createProductPriceComponentViewState: ViewState<string>
}

const initialState: ProductCreatePriceComponentState = {
  createProductPriceComponentViewState: initialViewState(),
}

export const productCreatePriceComponentReducer = (
  state: ProductCreatePriceComponentState = initialState,
  action: AnyAction,
): ProductCreatePriceComponentState => {
  switch (action.type) {
    case asStarted(ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE):
      return {
        ...state,
        createProductPriceComponentViewState: startLoading<string>(state.createProductPriceComponentViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE):
      return {
        ...state,
        createProductPriceComponentViewState: withDomainResult<string>(
          state.createProductPriceComponentViewState,
          action.result,
        ),
      }
    case asError(ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE):
      return {
        ...state,
        createProductPriceComponentViewState: withDomainError<string>(
          state.createProductPriceComponentViewState,
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
