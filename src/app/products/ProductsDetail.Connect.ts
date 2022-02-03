import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ProductsActionType } from "./Products.Epic"
import { ProductsDetailComponent } from "./ProductsDetail.Component"
import { ProductPriceComponent, ProductUpsert } from "../../domain/products/Products.Model"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productsDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProductById: (productId: string) => {
      dispatch({
        type: ProductsActionType.GET_PRODUCT_BY_ID,
        productId: productId,
      })
    },
    editProductDetail: (productUpsert: ProductUpsert) => {
      dispatch({
        type: ProductsActionType.PRODUCT_UPDATE,
        productId: productUpsert,
      })
    },
    deleteProduct: (productId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: ProductsActionType.PRODUCT_DELETE,
          productId: productId,
        },
      })
    },
    navigateToCreatePriceComponent: (productId: string) => {
      dispatch(push(`/products/${productId}/price/create`))
    },
    updatePriceComponent: (productId: string, priceId: string, productPriceComponent: ProductPriceComponent) => {
      dispatch({
        type: ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE,
        productId: productId,
        priceId: priceId,
        priceComponent: productPriceComponent,
      })
    },
    deletePriceComponent: (productId: string, priceId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: ProductsActionType.PRODUCT_PRICE_COMPONENT_DELETE,
          productId: productId,
          priceId: priceId,
        },
      })
    },
    navigateToUpdatePriceComponent: (productId: string, priceComponentId: string) => {
      dispatch(push(`/products/${productId}/price/${priceComponentId}/update`))
    },
    navigateToUpdateProduct: (productId: string) => {
      dispatch(push(`/products/${productId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetailComponent)
