import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ProductsActionType } from "./Products.Epic"
import { ProductPriceComponentUpsert } from "../../domain/products/Products.Model"
import { ProductCreatePriceComponentComponent } from "./ProductCreatePriceComponent.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.productCreatePriceComponent,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createPriceComponent: (productId: string, productPriceComponent: ProductPriceComponentUpsert) => {
      dispatch({
        type: ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE,
        productId: productId,
        productPriceComponent: productPriceComponent,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreatePriceComponentComponent)
