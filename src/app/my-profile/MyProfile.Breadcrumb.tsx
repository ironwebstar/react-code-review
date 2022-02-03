import { useTranslation } from "react-i18next"
import { Route, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"

export const MyProfileBreadcrumb = () => {
  const { t } = useTranslation("my-profile")
  return (
    <Switch>
      <Route path="/my-profile/">
        <TextButton disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
