import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { ServiceComponentsDetailState } from "./ServiceComponentsDetail.Reducer"
import { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { AlignEndBox, SpaceBetweenMiddleBox } from "../../uikit/box/AlignmentBox"
import { mapDispatchToProps } from "./ServiceComponentsDetail.Connect"
import { Skeleton } from "@mui/material"

interface ServiceComponentsDetailProps
  extends ServiceComponentsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ServiceComponentsDetailComponent = (props: ServiceComponentsDetailProps) => {
  const { t } = useTranslation("service-components")
  const { viewState, getServiceComponent, navigateToServiceComponentUpdate, match, showUpdateAlert } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getServiceComponent(match.params.serviceComponentId)
    }
  }, [viewState, match])
  if (viewState.domainError)
    return (
      <ErrorAlert
        message={viewState.domainError.message}
        retry={() => getServiceComponent(match.params.serviceComponentId)}
      />
    )
  return (
    <>
      {showUpdateAlert && <SuccessAlert message={t("form.alert.success")} />}
      <PaperBox>
        <AlignEndBox>
          <SmallPaddedBox>
            <PrimaryEditButton onClick={() => navigateToServiceComponentUpdate(match.params.serviceComponentId)} />
          </SmallPaddedBox>
        </AlignEndBox>
        {viewState.isLoading && <Skeleton />}
        {coerce(viewState.domainResult, (serviceComponent) => (
          <SpaceBetweenMiddleBox>
            <FlexOneBox>
              <DataItemBox
                id="service-component"
                title={t("list.label.service-component")}
                value={serviceComponent.name}
              />
            </FlexOneBox>
          </SpaceBetweenMiddleBox>
        ))}
      </PaperBox>
    </>
  )
}
