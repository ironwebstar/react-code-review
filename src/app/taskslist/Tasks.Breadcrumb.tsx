import { useTranslation } from "react-i18next"
import { Route, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"

export const TasksBreadcrumb = () => {
  const { t } = useTranslation("tasklist")
  return (
    <Switch>
      <Route path="/tasklist/">
        <TextButton label={t("list.title")} />
      </Route>
    </Switch>
  )
}
