import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ConsumptionPointsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("consumptionpoints")
  const { history } = props
  return (
    <Switch>
      <Route path="/buildings/:buildingId/consumptionpoints/:consumptionPointId/update">
        <TextButton label={t("list.title")} onClick={() => history.push("/consumptionpoints")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton
          label={t("detail.title")}
          resolvePath={(params) => `/buildings/${params.buildingId}/consumptionpoints/${params.consumptionPointId}`}
        />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("update.title")} />
      </Route>
      <Route path="/buildings/:buildingId/consumptionpoints/:consumptionPointId">
        <TextButton label={t("list.title")} onClick={() => history.push("/consumptionpoints")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/consumptionpoints">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
