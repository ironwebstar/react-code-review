import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ProfilesBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("profiles")
  const { history } = props
  return (
    <Switch>
      <Route path="/profiles/create">
        <TextButton label={t("list.title")} onClick={() => history.push("/profiles")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("create.title")} />
      </Route>
      <Route path="/profiles/:profileId/update">
        <TextButton label={t("list.title")} onClick={() => history.push("/profiles")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton label={t("detail.title")} resolvePath={(params) => `/profiles/${params.profileId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("update.title")} />
      </Route>
      <Route path="/profiles/:profileId">
        <TextButton label={t("list.title")} onClick={() => history.push("/profiles")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/profiles">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
