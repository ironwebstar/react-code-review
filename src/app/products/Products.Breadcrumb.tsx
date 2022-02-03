import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ProductsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("products")
  const { history } = props
  return (
    <Switch>
      <Route path="/products/:productId/price/create">
        <TextButton label={t("list.title")} onClick={() => history.push("/products")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("detail.title")} resolvePath={(params) => `/products/${params.productId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("price.form.title.createPriceComponent")} />
      </Route>
      <Route path="/products/:productId/price/:priceId/update">
        <TextButton label={t("list.title")} onClick={() => history.push("/products")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("detail.title")} resolvePath={(params) => `/products/${params.productId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("price.form.title.updatePriceComponent")} />
      </Route>
      <Route path="/products/create">
        <TextButton label={t("list.title")} onClick={() => history.push("/products")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("create.title")} />
      </Route>
      <Route path="/products/:productId/update">
        <TextButton label={t("list.title")} onClick={() => history.push("/products")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("detail.title")} resolvePath={(params) => `/products/${params.productId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("update.title")} />
      </Route>
      <Route path="/products/:productId">
        <TextButton label={t("list.title")} onClick={() => history.push("/products")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/products">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
