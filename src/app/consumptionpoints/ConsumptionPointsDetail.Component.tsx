import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { StatusType } from "../../domain/Domain.Model"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { SpaceBetweenBox, AlignBottomBox } from "../../uikit/box/AlignmentBox"
import { OpenButton } from "../../uikit/button/OpenButton"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { StatusView } from "../../uikit/label/StatusView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { ConnectionObjectsIcon, DeactivateIcon, RemoveIcon } from "../../uikit/Shared.Icon"
import { AppRouteParams } from "../App.Routes"
import { firstViewState } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { mapDispatchToProps } from "./ConsumptionPointsDetail.Connect"
import { ConsumptionPointsDetailState } from "./ConsumptionPointsDetail.Reducer"
import ConsumptionPointsParticipationsConnect from "./ConsumptionPointsParticipations.Connect"
import MeterReadingsConsumptionPointConnect from "../meter-readings/MeterReadingsConsumptionPoint.Connect"
import { ConsumptionPointDeactivateForm } from "./form/ConsumptionPointDeactivateForm"

interface consumptionPointsDetailProps
  extends ConsumptionPointsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ConsumptionPointsDetailComponent = (props: consumptionPointsDetailProps) => {
  const { t } = useTranslation("consumptionpoints")
  const {
    viewState,
    match,
    getConsumptionPoint,
    deactivateConsumptionPoint,
    deleteConsumptionPoint,
    navigateToBuilding,
    navigateToUpdateConsumptionPoint,
    deactivateViewState,
    deleteViewState,
  } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getConsumptionPoint(match.params.buildingId, match.params.consumptionPointId)
    }
  }, [viewState])
  const isDeletable = useMemo(() => {
    if (!viewState.domainResult) return false
    return [StatusType.DRAFT, StatusType.INACTIVE].includes(viewState.domainResult?.statusType)
  }, [viewState])

  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  if (viewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {viewState.domainError && (
        <ErrorAlert
          retry={() => getConsumptionPoint(match.params.buildingId, match.params.consumptionPointId)}
          message={viewState.domainError.message}
        />
      )}
      {deleteViewState.domainResult && <Redirect to="/consumptionpoints" />}
      {coerce(viewState.domainResult, (consumptionPoint) => (
        <>
          <PaperBox>
            <SpaceBetweenBox>
              <SmallPaddedBox>
                <StatusView statusType={StatusType[consumptionPoint.statusType]} />
              </SmallPaddedBox>
              <SmallPaddedBox>
                <PrimaryEditButton
                  onClick={() => navigateToUpdateConsumptionPoint(consumptionPoint.buildingId, consumptionPoint.id)}
                />
              </SmallPaddedBox>
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.name")} value={consumptionPoint.name} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.type")} value={t(`type.${consumptionPoint.type}`)} />
              </FlexOneBox>
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.billableFrom")} value={consumptionPoint.billableFrom} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.billableTo")} value={consumptionPoint.billableTo} />
              </FlexOneBox>
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("details.field.powerMeterType")}
                  value={t(`powerMeterType.${consumptionPoint.powerMeterType}`)}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.pricePackage")} value={consumptionPoint.currentPricePackageName} />
              </FlexOneBox>
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox title={t("details.field.meteringCode")} value={consumptionPoint.meteringCode} />
              </FlexOneBox>
            </SpaceBetweenBox>
            <FormSectionTitle
              label={t("details.subtitle.building")}
              icon={<ConnectionObjectsIcon fontSize="large" />}
            />
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("details.building.field.name")}
                  value={
                    <OpenButton
                      label={consumptionPoint.buildingName}
                      open={() => navigateToBuilding(consumptionPoint.zevId, consumptionPoint.buildingId)}
                    />
                  }
                />
              </FlexOneBox>
            </SpaceBetweenBox>
            {deactivateViewState.domainResult && <SuccessAlert message={t("details.action.deactivate.success")} />}
            {deactivateViewState.domainError && <ErrorAlert message={deactivateViewState.domainError.message} />}
            {deleteViewState.domainError && <ErrorAlert message={deleteViewState.domainError.message} />}
            <DividerBox />
            <SpaceBetweenBox>
              <AlignBottomBox>
                <PrimaryButtonLoading
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("details.action.delete")}
                  isLoading={deleteViewState.isLoading}
                  disabled={!isDeletable}
                  onClick={() =>
                    deleteConsumptionPoint(
                      consumptionPoint.id,
                      t("details.action.delete.confirm"),
                      t("details.action.delete.confirm.cta"),
                    )
                  }
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<DeactivateIcon fontSize="large" />}
                  label={t("details.action.deactivate")}
                  isLoading={deactivateViewState.isLoading}
                  disabled={consumptionPoint.statusType !== StatusType.ACTIVE}
                  onClick={() => setShowDeactivateDialog(true)}
                />
              </AlignBottomBox>
            </SpaceBetweenBox>
            {showDeactivateDialog && (
              <ConsumptionPointDeactivateForm
                open={showDeactivateDialog}
                onClose={() => setShowDeactivateDialog(false)}
                confirmClick={(billingUntilDate) => {
                  setShowDeactivateDialog(false)
                  deactivateConsumptionPoint(consumptionPoint.id, billingUntilDate)
                }}
              />
            )}
          </PaperBox>
          <DividerBox />
          <ConsumptionPointsParticipationsConnect
            consumptionPointId={consumptionPoint.id}
            zevId={consumptionPoint.zevId}
            buildingId={consumptionPoint.buildingId}
            participants={consumptionPoint.participants}
          />
          <DividerBox />
          <MeterReadingsConsumptionPointConnect consumptionPointId={consumptionPoint.id} />
          <DividerBox />
        </>
      ))}
    </>
  )
}
