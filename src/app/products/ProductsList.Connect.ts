import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ProductsActionType } from "./Products.Epic"
import { ProductListComponent } from "./ProductsList.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProducts: () => {
      dispatch({
        type: ProductsActionType.GET_PRODUCTS,
      })
    },
    navigateProductList: () => {
      dispatch(push("/products"))
    },
    navigateToProduct: (productId: string) => {
      dispatch(push(`/products/${productId}`))
    },
    navigateToCreateProduct: () => {
      dispatch(push("/products/create"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListComponent)
