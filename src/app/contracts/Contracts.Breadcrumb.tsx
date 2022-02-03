import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ContractsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("contracts")
  const { history } = props
  return (
    <Switch>
      <Route path="/zevs/:zevId/contract/create">
        <TextButton label={t("zevs:list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("zevs:detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("create.title")} />
      </Route>
      <Route path="/contracts/:contractId/update">
        <TextButton label={t("list.title")} onClick={() => history.push("/contracts")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("detail.title")} resolvePath={(params) => `/contracts/${params.contractId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("update.title")} />
      </Route>
      <Route path="/contracts/:contractId">
        <TextButton label={t("list.title")} onClick={() => history.push("/contracts")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/contracts/">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
