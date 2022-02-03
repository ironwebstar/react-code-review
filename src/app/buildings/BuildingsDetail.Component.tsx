import { useTranslation } from "react-i18next"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { BuildingsDetailState } from "./BuildingsDetail.Reducer"
import { useEffect, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { SpaceBetweenMiddleBox, AlignBottomBox } from "../../uikit/box/AlignmentBox"
import { coerce } from "../Shared.View"
import { ImpressionHeader, PageHeader } from "../../uikit/typography/Header"
import { SmallPaddedBox, TinyPaddedHorizontalBox } from "../../uikit/box/PaddedBox"
import { AppRouteParams } from "../App.Routes"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { FormSectionTitle, FormSubtitle } from "../../uikit/form/FormView"
import { AddressIcon, DeactivateIcon, RemoveIcon, ZevsIcon } from "../../uikit/Shared.Icon"
import { TableCell, TableContainer } from "@mui/material"
import { DividerBox } from "../../uikit/box/DividerBox"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { TableRowView, TableRowClickable } from "../../uikit/table/Table.RowView"
import { BuilingConsumptionPoint } from "../../domain/buildings/Buildings.Model"
import { StatusView } from "../../uikit/label/StatusView"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { StatusType } from "../../domain/Domain.Model"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { BuildingDeactivateForm } from "./form/BuildingDeactivateForm"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./BuildingsDetail.Connect"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { OpenButton } from "../../uikit/button/OpenButton"

enum ConsumptionPointColumns {
  STATUS_TYPE = "STATUS_TYPE",
  NAME = "NAME",
  TYPE = "TYPE",
  POWER_METER_TYPE = "METERING_CODE",
  SUBSCRIBER_NAME = "SUBSCRIBER_NAME",
}

interface BuildingsDetailProps
  extends BuildingsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BuildingsDetailComponent = (props: BuildingsDetailProps) => {
  const { t } = useTranslation("buildings")
  const {
    viewState,
    match,
    getBuilding,
    deactivateBuilding,
    deactivateViewState,
    deleteBuilding,
    deleteViewState,
    navigateToZev,
    navigateToConsumptionPoint,
    navigateToUpdateBuilding,
    showUpdateAlert,
    navigateToCreateConsumptionPoint,
  } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getBuilding(match.params.zevId, match.params.buildingId)
    }
  }, [viewState])
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  const [orderBy, setOrderBy] = useState<TableColumnSort<ConsumptionPointColumns>>({
    column: ConsumptionPointColumns.NAME,
    direction: "asc",
  })
  if (viewState.isLoading) return <ProgressIndicator />
  if (viewState.domainError)
    return (
      <ErrorAlert
        retry={() => getBuilding(match.params.zevId, match.params.buildingId)}
        message={viewState.domainError.message}
      />
    )
  return (
    <>
      {deactivateViewState.domainResult && <SuccessAlert message={t("details.action.deactivate.success")} />}
      {deactivateViewState.domainError && <ErrorAlert message={deactivateViewState.domainError.message} />}
      {deleteViewState.domainResult && <Redirect to="/buildings" />}
      {deleteViewState.domainError && <ErrorAlert message={deleteViewState.domainError.message} />}
      {showUpdateAlert && <SuccessAlert message={t("form.alert.success")} />}
      {coerce(viewState.domainResult, (building) => (
        <>
          <PaperBox>
            <SpaceBetweenMiddleBox>
              <SmallPaddedBox>
                <StatusView statusType={building.statusType} />
              </SmallPaddedBox>
              {building.statusType !== StatusType.INACTIVE && (
                <SmallPaddedBox>
                  <PrimaryEditButton onClick={() => navigateToUpdateBuilding(building.zevId, building.id)} />
                </SmallPaddedBox>
              )}
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <ImpressionHeader>{building.name}</ImpressionHeader>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FormSubtitle label={t("form.subtitle.address")} icon={<AddressIcon />} />
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressStreet")} value={building.addressStreet} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressCity")} value={building.addressCity} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FormSectionTitle label={t("form.subtitle.zev")} icon={<ZevsIcon fontSize="large" />} />
              <TinyPaddedHorizontalBox>
                <OpenButton label={building.zevName} open={() => navigateToZev(match.params.zevId)} />
              </TinyPaddedHorizontalBox>
            </SpaceBetweenMiddleBox>
            <DividerBox />
            <SmallPaddedBox>
              <AlignBottomBox>
                <PrimaryButtonLoading
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("details.action.delete")}
                  isLoading={deleteViewState.isLoading}
                  disabled={building.statusType !== StatusType.DRAFT}
                  onClick={() => deleteBuilding(building.id)}
                />
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<DeactivateIcon fontSize="large" />}
                  label={t("details.action.deactivate")}
                  isLoading={deactivateViewState.isLoading}
                  disabled={building.statusType !== StatusType.ACTIVE}
                  onClick={() => setShowDeactivateDialog(true)}
                />
              </AlignBottomBox>
            </SmallPaddedBox>
          </PaperBox>
          <DividerBox />
          <PaperBox>
            <SpaceBetweenMiddleBox>
              <PageHeader>{t("details.consumption.title")}</PageHeader>
              {building.statusType !== StatusType.INACTIVE && (
                <SmallPaddedBox>
                  <PrimaryPlusButton onClick={() => navigateToCreateConsumptionPoint(building.id)} />
                </SmallPaddedBox>
              )}
            </SpaceBetweenMiddleBox>
            <TableContainer>
              <TableFixed>
                <TableHeaderView<ConsumptionPointColumns>
                  isLoading={viewState.isLoading}
                  headers={[
                    {
                      column: ConsumptionPointColumns.STATUS_TYPE,
                      label: t("details.consumptionpoint.list.status"),
                      width: "10%",
                      orderable: false,
                    },
                    {
                      column: ConsumptionPointColumns.NAME,
                      label: t("details.consumptionpoint.list.name"),
                      width: "20%",
                      orderable: false,
                    },
                    {
                      column: ConsumptionPointColumns.TYPE,
                      label: t("details.consumptionpoint.list.type"),
                      width: "10%",
                      orderable: false,
                    },
                    {
                      column: ConsumptionPointColumns.POWER_METER_TYPE,
                      label: t("details.consumptionpoint.list.powerMeterType"),
                      width: "20%",
                      orderable: false,
                    },
                    {
                      column: ConsumptionPointColumns.SUBSCRIBER_NAME,
                      label: t("details.consumptionpoint.list.subscriber"),
                      width: "40%",
                      orderable: false,
                    },
                  ]}
                  orderBy={orderBy}
                  orderByChanged={(orderBy) => setOrderBy(orderBy)}
                />
                <TableRowView<BuilingConsumptionPoint>
                  colSpan={5}
                  rows={building.consumptionPoints}
                  pageRowSlice={{
                    start: 0,
                    end: 100,
                  }}
                  render={(consumptionPoint) => (
                    <TableRowClickable<BuilingConsumptionPoint>
                      key={consumptionPoint.id}
                      rowData={consumptionPoint}
                      rowClick={(consumptionPoint) => navigateToConsumptionPoint(building.id, consumptionPoint.id)}
                    >
                      <TableCell align="left">
                        <StatusView statusType={consumptionPoint.statusType} />
                      </TableCell>
                      <TableCell align="left">{consumptionPoint.name}</TableCell>
                      <TableCell align="left">{consumptionPoint.type}</TableCell>
                      <TableCell align="left">{consumptionPoint.powerMeterType}</TableCell>
                      <TableCell align="left">{consumptionPoint.subscriberName}</TableCell>
                    </TableRowClickable>
                  )}
                />
              </TableFixed>
            </TableContainer>
            {showDeactivateDialog && (
              <BuildingDeactivateForm
                open={showDeactivateDialog}
                onClose={() => setShowDeactivateDialog(false)}
                confirmClick={(billingUntilDate) => {
                  setShowDeactivateDialog(false)
                  deactivateBuilding(building.id, billingUntilDate)
                }}
              />
            )}
          </PaperBox>
        </>
      ))}
    </>
  )
}
