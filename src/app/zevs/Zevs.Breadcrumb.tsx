import { useTranslation } from "react-i18next"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import { TextButton } from "../../uikit/button/TextButton"
import { BreadcrumbIcon } from "../../uikit/Shared.Icon"
import { AppRouteButton, AppRouteParams } from "../App.Routes"

export const ZevsBreadcrumb = (props: RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation("zevs")
  const { history } = props
  return (
    <Switch>
      <Route path="/zevs/:zevId/participant/:participantId/update">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton id="breadcrumb-1" label={t("detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton
          id="breadcrumb-2"
          label={t("participant.title")}
          resolvePath={(params) => `/zevs/${params.zevId}`}
        />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton id="breadcrumb-3" disabled label={t("edit.participant.title")} />
      </Route>
      <Route path="/zevs/:zevId/participant/:participantId">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton id="breadcrumb-1" label={t("detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton
          id="breadcrumb-2"
          label={t("participant.title")}
          resolvePath={(params) => `/zevs/${params.zevId}`}
        />
        <BreadcrumbIcon color="secondary" fontSize="small" />
      </Route>
      <Route path="/zevs/:zevId/update">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <AppRouteButton id="breadcrumb-1" label={t("detail.title")} resolvePath={(params) => `/zevs/${params.zevId}`} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton id="breadcrumb-2" disabled label={t("update.title")} />
      </Route>
      <Route path="/zevs/create">
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton id="breadcrumb-2" disabled label={t("create.title")} />
      </Route>
      <Route path="/zevs/:zevId" exact>
        <TextButton id="breadcrumb-0" label={t("list.title")} onClick={() => history.push("/zevs")} />
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <TextButton id="breadcrumb-1" disabled label={t("detail.title")} />
      </Route>
      <Route path="/zevs" exact>
        <TextButton id="breadcrumb-0" disabled label={t("list.title")} />
      </Route>
    </Switch>
  )
}
