import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
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

export interface ProductsCreateState {
  createViewState: ViewState<string>
}

export const initialState: ProductsCreateState = {
  createViewState: initialViewState(),
}

export const productsCreateReducer = (
  state: ProductsCreateState = initialState,
  action: AnyAction,
): ProductsCreateState => {
  switch (action.type) {
    case asStarted(ProductsActionType.PRODUCT_CREATE):
      return {
        ...state,
        createViewState: startLoading<string>(state.createViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_CREATE):
      return {
        ...state,
        createViewState: withDomainResult<string>(state.createViewState, action.result),
      }
    case asError(ProductsActionType.PRODUCT_CREATE):
      return {
        ...state,
        createViewState: withDomainError<string>(state.createViewState, action.result),
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
