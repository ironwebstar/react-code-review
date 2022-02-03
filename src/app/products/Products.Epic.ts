import { createEpic } from "../Shared.Epic"
import { DOMAIN_DEPENDENCIES } from "../App.Config"

import {
  ProductDetail,
  ProductList,
  ProductUpsert,
  ProductPriceComponentUpsert,
} from "../../domain/products/Products.Model"

import {
  createPriceComponent,
  deletePriceComponent,
  deleteProduct,
  updatePriceComponent,
  updateProduct,
  getProductById,
  getProducts,
  createProduct,
  getProductUpdateById,
  getProductPriceComponentUpdateById,
} from "../../domain/products/Products.Repository"

export enum ProductsActionType {
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_DELETE = "PRODUCT_DELETE",
  PRODUCT_UPDATE = "PRODUCT_UPDATE",
  PRODUCT_GET_UPDATE_BY_ID = "PRODUCT_GET_UPDATE_BY_ID",
  GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID = "GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID",
  PRODUCT_PRICE_COMPONENT_CREATE = "PRODUCT_PRICE_COMPONENT_CREATE",
  PRODUCT_PRICE_COMPONENT_UPDATE = "PRODUCT_PRICE_COMPONENT_UPDATE",
  PRODUCT_PRICE_COMPONENT_DELETE = "PRODUCT_PRICE_COMPONENT_DELETE",
}

export const productsEpic = [
  createEpic<ProductList>(ProductsActionType.GET_PRODUCTS, () => getProducts(DOMAIN_DEPENDENCIES)),
  createEpic<ProductDetail>(ProductsActionType.GET_PRODUCT_BY_ID, (action) =>
    getProductById(action.productId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(ProductsActionType.PRODUCT_CREATE, (action) =>
    createProduct(action.productCreate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProductsActionType.PRODUCT_UPDATE, (action) =>
    updateProduct(action.productId, action.productUpdate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ProductUpsert>(ProductsActionType.PRODUCT_GET_UPDATE_BY_ID, (action) =>
    getProductUpdateById(action.productId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProductsActionType.PRODUCT_DELETE, (action) =>
    deleteProduct(action.productId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ProductPriceComponentUpsert>(ProductsActionType.GET_PRODUCT_PRICE_COMPONENT_UPDATE_BY_ID, (action) =>
    getProductPriceComponentUpdateById(action.productId, action.priceId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProductsActionType.PRODUCT_PRICE_COMPONENT_CREATE, (action) =>
    createPriceComponent(action.productId, action.productPriceComponent, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProductsActionType.PRODUCT_PRICE_COMPONENT_UPDATE, (action) =>
    updatePriceComponent(action.productId, action.priceId, action.productPriceComponentUpdate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProductsActionType.PRODUCT_PRICE_COMPONENT_DELETE, (action) =>
    deletePriceComponent(action.productId, action.priceId, DOMAIN_DEPENDENCIES),
  ),
]
