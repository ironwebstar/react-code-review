import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const BuildingsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("buildings")
  const { history } = props
  return (
    <Switch>
      <Route path="/zevs/:zevId/buildings/:buildingId/update">
        <TextButton label={t("zevs:list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("zevs:detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("details.title")} resolvePath={(params) => `/buildings/${params.buildingId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("update.title")} />
      </Route>
      <Route path="/zevs/:zevId/buildings/:buildingId">
        <TextButton id="breadcrumb-0" label={t("zevs:list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("zevs:detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("details.title")} />
      </Route>
      <Route path="/buildings" exact>
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
