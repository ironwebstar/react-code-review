import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../../uikit/Shared.Icon"
import { AppRouteParams } from "../../App.Routes"

export const BillingsInitialBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("billings-initial")
  const { history } = props
  return (
    <Switch>
      <Route path="/billings/initial/details/:billingId">
        <TextButton label={t("list.title")} onClick={() => history.push("/billings/initial")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/billings/initial">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
