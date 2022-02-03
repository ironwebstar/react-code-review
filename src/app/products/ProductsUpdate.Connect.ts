import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ProductsActionType } from "./Products.Epic"
import { ProductUpsert } from "../../domain/products/Products.Model"
import { ProductsUpdateComponent } from "./ProductsUpdate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productsUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProductUpdate: (productId: string) => {
      dispatch({
        type: ProductsActionType.PRODUCT_GET_UPDATE_BY_ID,
        productId: productId,
      })
    },
    updateProduct: (productId: string, productUpdate: ProductUpsert) => {
      dispatch({
        type: ProductsActionType.PRODUCT_UPDATE,
        productId: productId,
        productUpdate: productUpdate,
      })
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsUpdateComponent)
