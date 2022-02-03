import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ProductsActionType } from "./Products.Epic"
import { ProductPriceComponentUpsert } from "../../domain/products/Products.Model"
import { ProductUpdatePriceComponentComponent } from "./ProductUpdatePriceComponent.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productUpdatePriceComponent,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProductPriceComponentUpdateById: (productId: string, priceId: string) => {
      dispatch({
        type: ProductsActionType.GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID,
        productId: productId,
        priceId: priceId,
      })
    },
    updatePriceComponent: (
      productId: string,
      priceId: string,
      productPriceComponentUpdate: ProductPriceComponentUpsert,
    ) => {
      dispatch({
        type: ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE,
        productId: productId,
        priceId: priceId,
        productPriceComponentUpdate: productPriceComponentUpdate,
      })
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdatePriceComponentComponent)
