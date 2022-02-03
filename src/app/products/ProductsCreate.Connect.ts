import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ProductsActionType } from "./Products.Epic"
import { ProductUpsert } from "../../domain/products/Products.Model"
import { push } from "connected-react-router"
import { ProductsCreateComponent } from "./ProductsCreate.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productsCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createProduct: (productCreate: ProductUpsert) => {
      dispatch({
        type: ProductsActionType.PRODUCT_CREATE,
        productCreate: productCreate,
      })
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCreateComponent)
