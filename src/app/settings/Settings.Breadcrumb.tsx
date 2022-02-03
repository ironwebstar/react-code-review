import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteParams } from "../App.Routes"

export const SettingsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("settings")
  const { history } = props
  return (
    <Switch>
      <Route path="/settings/reset-password">
        <TextButton id="breadcrumb-0" label={t("detail.title")} onClick={() => history.push("/settings")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled id="breadcrumb-1" label={t("form.title")} />
      </Route>
      <Route path="/settings">
        <TextButton disabled id="breadcrumb-0" label={t("detail.title")} />
      </Route>
    </Switch>
  )
}
