import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../../uikit/Shared.Icon"
import { AppRouteParams } from "../../App.Routes"

export const BillingsRecurringBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("billings-recurring")
  const { history } = props
  return (
    <Switch>
      <Route path="/billings/recurring/create">
        <TextButton label={t("list.title")} onClick={() => history.push("/billings/recurring")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("create.title")} />
      </Route>
      <Route path="/billings/recurring/:billingId">
        <TextButton label={t("list.title")} onClick={() => history.push("/billings/recurring")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton disabled label={t("detail.title")} />
      </Route>
      <Route path="/billings/recurring">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
