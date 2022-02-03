import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  initialViewStateMap,
  showSuccessAlertById,
  startLoading,
  startLoadingMap,
  ViewState,
  ViewStateMap,
  withDomainError,
  withDomainErrorMap,
  withDomainResult,
  withDomainResultMap,
} from "../Shared.Reducer"
import { ProductPriceComponent, ProductDetail } from "../../domain/products/Products.Model"
import { ProductsActionType } from "./Products.Epic"

export interface ProductsDetailState {
  getProductViewState: ViewState<ProductDetail>
  deleteProductViewState: ViewState<boolean>
  deletePriceComponentViewState: ViewStateMap<string, boolean>
  editPriceComponentViewState: ViewState<ProductPriceComponent>
  showUpdateAlert: boolean
  prevChangeId?: string
  prevPriceComponentDeleteId?: string
  showPriceComponentCreateSuccessAlert: boolean
  showPriceComponentUpdateSuccessAlert: boolean
}

export const initialState: ProductsDetailState = {
  getProductViewState: initialViewState(),
  deleteProductViewState: initialViewState(),
  deletePriceComponentViewState: initialViewStateMap(),
  editPriceComponentViewState: initialViewState(),
  showUpdateAlert: false,
  showPriceComponentCreateSuccessAlert: false,
  showPriceComponentUpdateSuccessAlert: false,
}

export const productsDetailReducer = (
  state: ProductsDetailState = initialState,
  action: AnyAction,
): ProductsDetailState => {
  switch (action.type) {
    case asStarted(ProductsActionType.GET_PRODUCT_BY_ID):
      return {
        ...state,
        getProductViewState: startLoading<ProductDetail>(state.getProductViewState),
      }
    case asSuccess(ProductsActionType.GET_PRODUCT_BY_ID):
      return {
        ...state,
        getProductViewState: withDomainResult<ProductDetail>(state.getProductViewState, action.result),
      }
    case asError(ProductsActionType.GET_PRODUCT_BY_ID):
      return {
        ...state,
        getProductViewState: withDomainError<ProductDetail>(state.getProductViewState, action.result),
      }
    case asStarted(ProductsActionType.PRODUCT_DELETE):
      return {
        ...state,
        deleteProductViewState: startLoading<boolean>(state.deleteProductViewState),
      }
    case asSuccess(ProductsActionType.PRODUCT_DELETE):
      return {
        ...state,
        deleteProductViewState: withDomainResult<boolean>(state.deleteProductViewState, action.result),
      }
    case asError(ProductsActionType.PRODUCT_DELETE):
      return {
        ...state,
        deleteProductViewState: withDomainError<boolean>(state.deleteProductViewState, action.result),
      }
    case asStarted(ProductsActionType.PRODUCT_PRICE_COMPONENT_DELETE):
      return {
        ...state,
        deletePriceComponentViewState: startLoadingMap<string, boolean>(
          action.priceId,
          state.deletePriceComponentViewState,
        ),
      }
    case asSuccess(ProductsActionType.PRODUCT_PRICE_COMPONENT_DELETE):
      return {
        ...state,
        prevPriceComponentDeleteId: action.priceId,
        deletePriceComponentViewState: withDomainResultMap<string, boolean>(
          action.priceId,
          state.deletePriceComponentViewState,
          action.result,
        ),
        getProductViewState: {
          ...state.getProductViewState,
          domainResult: state.getProductViewState.domainResult && {
            ...state.getProductViewState.domainResult,
            priceComponents: state.getProductViewState.domainResult.priceComponents.filter(
              (priceComponent) => priceComponent.id !== action.priceId,
            ),
          },
        },
      }
    case asError(ProductsActionType.PRODUCT_PRICE_COMPONENT_DELETE):
      return {
        ...state,
        deletePriceComponentViewState: withDomainErrorMap<string, boolean>(
          action.priceId,
          state.deletePriceComponentViewState,
          action.result,
        ),
      }
    case asSuccess(ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE):
      return {
        ...state,
        prevChangeId: action.productId,
        showPriceComponentCreateSuccessAlert: true,
      }
    case asSuccess(ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE):
      return {
        ...state,
        prevChangeId: action.productId,
        showPriceComponentUpdateSuccessAlert: true,
      }
    case asSuccess(ProductsActionType.PRODUCT_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        prevChangeId: state.getProductViewState.domainResult?.id ?? state.prevChangeId,
        showUpdateAlert: showSuccessAlertById(
          state.showUpdateAlert,
          action.payload.location.pathname,
          state.prevChangeId,
        ),
        showPriceComponentCreateSuccessAlert: showSuccessAlertById(
          state.showPriceComponentCreateSuccessAlert,
          action.payload.location.pathname,
          state.prevChangeId,
        ),
        showPriceComponentUpdateSuccessAlert: showSuccessAlertById(
          state.showPriceComponentUpdateSuccessAlert,
          action.payload.location.pathname,
          state.prevChangeId,
        ),
      }
    default:
      return {
        ...state,
      }
  }
}
