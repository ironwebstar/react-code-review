import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ServiceComponentBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("service-components")
  const { history } = props
  return (
    <Switch>
      <Route path="/service-components/:serviceComponentId/update">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/service-components")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton
          id="breadcrumb-1"
          label={t("detail.title")}
          resolvePath={(params) => `/service-components/${params.serviceComponentId}`}
        />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled id="breadcrumb-2" label={t("update.title")} />
      </Route>
      <Route path="/service-components/:serviceComponentId">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/service-components")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled id="breadcrumb-1" label={t("detail.title")} />
      </Route>
      <Route path="/service-components">
        <TextButton disabled id="breadcrumb-0" label={t("list.title")} />
      </Route>
    </Switch>
  )
}
