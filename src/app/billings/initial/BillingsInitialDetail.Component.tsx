import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { useEffect, useState } from "react"
import { Redirect } from "react-router"
import { Grid, Stack, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

import { AppRouteParams } from "../../App.Routes"
import { DataItemBox } from "../../../uikit/box/DataItemBox"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { FlexOneBox } from "../../../uikit/box/FlexBox"
import { MediumPaddedBox, SmallPaddedBox, SmallPaddedHorizontalBox } from "../../../uikit/box/PaddedBox"
import { AlignBetweenBox, AlignEndBox, SpaceBetweenMiddleBox } from "../../../uikit/box/AlignmentBox"
import { StatusView } from "../../../uikit/label/StatusView"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { OpenButton } from "../../../uikit/button/OpenButton"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { TableRowView } from "../../../uikit/table/Table.RowView"
import { ImpressionHeader, PageHeader } from "../../../uikit/typography/Header"
import { ErrorAlert, OptionalErrorAlert, OptionalSuccessAlert, SuccessAlert } from "../../../uikit/Shared.Alert"
import { ProgressIndicator } from "../../../uikit/progress/ProgressIndicator"
import {
  ActivateIcon,
  ButtonCtaIcon,
  DeactivateIcon,
  RefreshIcon,
  RemoveIcon,
  SendIcon,
} from "../../../uikit/Shared.Icon"
import { PrimaryButtonLoading } from "../../../uikit/button/PrimaryButtonLoading"

import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import { StatusType } from "../../../domain/Domain.Model"
import { BillingsInitialPosition } from "../../../domain/billings/initial/BillingsInitial.Model"
import { domainErrorById, domainResultById, firstViewState, isLoadingById } from "../../Shared.Reducer"
import { coerce } from "../../Shared.View"

import { BillingsInitialDetailState } from "./BillingsInitialDetail.Reducer"
import { mapDispatchToProps } from "./BillingsInitialDetail.Connect"

enum BillPositionColumns {
  NAME = "NAME",
  QUANTITY = "QUANTITY",
  PRICE = "PRICE",
  TOTAL_AMOUNT_DUE = "TOTAL_AMOUNT_DUE",
}

interface BillingsInitialDetailProps
  extends BillingsInitialDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BillingsInitialDetailComponent = (props: BillingsInitialDetailProps) => {
  const { t } = useTranslation("billings-initial")
  const {
    viewState,
    match,
    getInitialBilling,
    navigateToZev,
    deleteBillingsInitialViewState,
    approveBillingsInitialViewState,
    sapSendBillingsInitialViewState,
    recalculateBillingsInitialViewState,
    cancelBillingsInitialViewState,
    recalculateInitialBillingById,
    approveInitialBillingById,
    cancelInitialBillingById,
    submitInitialBillingToSAP,
    deleteInitialBillingById,
  } = props
  const billingId = match.params.billingId

  useEffect(() => {
    if (firstViewState(viewState)) {
      getInitialBilling(match.params.billingId)
    }
  }, [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillPositionColumns>>({
    column: BillPositionColumns.NAME,
    direction: "asc",
  })

  const headers = [
    {
      column: BillPositionColumns.NAME,
      label: t("detail.consumptionpoint.list.initial-expenses"),
      width: "10%",
      orderable: true,
    },
    {
      column: BillPositionColumns.QUANTITY,
      label: t("detail.consumptionpoint.list.quality"),
      width: "20%",
      orderable: true,
    },
    {
      column: BillPositionColumns.PRICE,
      label: t("detail.consumptionpoint.list.price"),
      width: "10%",
      orderable: true,
    },
    {
      column: BillPositionColumns.TOTAL_AMOUNT_DUE,
      label: t("detail.consumptionpoint.list.total"),
      width: "20%",
      orderable: true,
    },
  ]

  if (viewState.domainError)
    return (
      <ErrorAlert retry={() => getInitialBilling(match.params.billingId)} message={viewState.domainError.message} />
    )
  if (viewState.isLoading) return <ProgressIndicator />
  if (deleteBillingsInitialViewState.domainResult) return <Redirect to="/billings/initial" />

  return (
    <>
      {deleteBillingsInitialViewState.domainError && (
        <ErrorAlert message={deleteBillingsInitialViewState.domainError.message} />
      )}
      {approveBillingsInitialViewState.domainError && (
        <ErrorAlert message={approveBillingsInitialViewState.domainError.message} />
      )}
      {approveBillingsInitialViewState.domainResult && <SuccessAlert message={t("details.action.approve.success")} />}
      {coerce(viewState.domainResult, (billingInitialDetail) => (
        <>
          <PaperBox>
            <SpaceBetweenMiddleBox>
              <SmallPaddedBox>
                <StatusView statusType={billingInitialDetail.statusType} />
              </SmallPaddedBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <ImpressionHeader>{billingInitialDetail.name}</ImpressionHeader>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("detail.label.zev")}
                  value={
                    <OpenButton
                      label={billingInitialDetail.zevName}
                      open={() => navigateToZev(billingInitialDetail.zevId)}
                    />
                  }
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("detail.label.date")} value={billingInitialDetail.date} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("detail.label.type")} value={billingInitialDetail.type} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("detail.label.order-reference-number")}
                  value={billingInitialDetail.orderReferenceNumber}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("detail.label.invoice-reference-number")}
                  value={billingInitialDetail.invoiceReferenceNumber}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("detail.label.accounting-status")}
                  value={billingInitialDetail.accountingStatus}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
          </PaperBox>
          <DividerBox />

          <OptionalSuccessAlert
            show={domainResultById(billingId, cancelBillingsInitialViewState)}
            message={t("details.action.cancel.success")}
          />
          <OptionalErrorAlert message={domainErrorById(billingId, cancelBillingsInitialViewState)} />
          <OptionalSuccessAlert
            scrollOnDisplay
            show={domainResultById(billingId, recalculateBillingsInitialViewState)}
            message={t("details.action.recalculate.success")}
          />
          <OptionalErrorAlert message={domainErrorById(billingId, recalculateBillingsInitialViewState)} />
          <OptionalSuccessAlert
            scrollOnDisplay
            show={domainResultById(billingId, sapSendBillingsInitialViewState)}
            message={t("details.action.billingSap.success")}
          />
          <OptionalErrorAlert message={domainErrorById(billingId, sapSendBillingsInitialViewState)} />

          <DividerBox />
          <PaperBox>
            <PageHeader>{t("detail.consumptionpoint.title")}</PageHeader>
            <TableContainer>
              <TableFixed>
                <TableHeaderView<BillPositionColumns>
                  isLoading={viewState.isLoading}
                  headers={headers}
                  orderBy={orderBy}
                  orderByChanged={(orderBy) => setOrderBy(orderBy)}
                />
                <TableRowView<BillingsInitialPosition>
                  colSpan={4}
                  rows={billingInitialDetail.positions}
                  pageRowSlice={{
                    start: 0,
                    end: 100,
                  }}
                  comparator={() => {
                    switch (orderBy.column) {
                      case BillPositionColumns.NAME:
                        return (a: BillingsInitialPosition, b: BillingsInitialPosition) =>
                          ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
                      case BillPositionColumns.QUANTITY:
                        return (a: BillingsInitialPosition, b: BillingsInitialPosition) =>
                          ORDERED_STRING_COMPARATOR(a.quantity, b.quantity, orderBy.direction)
                      case BillPositionColumns.PRICE:
                        return (a: BillingsInitialPosition, b: BillingsInitialPosition) =>
                          ORDERED_NUMBER_COMPARATOR(a.sortablePrice, b.sortablePrice, orderBy.direction)
                      case BillPositionColumns.TOTAL_AMOUNT_DUE:
                        return (a: BillingsInitialPosition, b: BillingsInitialPosition) =>
                          ORDERED_NUMBER_COMPARATOR(
                            a.sortableTotalAmountDue,
                            b.sortableTotalAmountDue,
                            orderBy.direction,
                          )
                    }
                  }}
                  render={(billingInitialDetail) => (
                    <TableRow key={billingInitialDetail.id}>
                      <TableCell align="left">{billingInitialDetail.name}</TableCell>
                      <TableCell align="left">{billingInitialDetail.quantity}</TableCell>
                      <TableCell align="left">{billingInitialDetail.price}</TableCell>
                      <TableCell align="left">{billingInitialDetail.totalAmountDue}</TableCell>
                    </TableRow>
                  )}
                />
              </TableFixed>
            </TableContainer>
            <AlignEndBox>
              <MediumPaddedBox>
                <Stack>
                  <SmallPaddedHorizontalBox>
                    <Typography variant="subtitle1" textAlign="end">
                      {t("detail.label.total")}
                    </Typography>
                  </SmallPaddedHorizontalBox>
                  <SmallPaddedHorizontalBox>
                    <Typography variant="h4">{billingInitialDetail.totalAmountDue}</Typography>
                  </SmallPaddedHorizontalBox>
                </Stack>
              </MediumPaddedBox>
            </AlignEndBox>
          </PaperBox>
          <SmallPaddedBox>
            <AlignBetweenBox>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <PrimaryButtonLoading
                      startIcon={<RefreshIcon fontSize="large" />}
                      label={t("detail.button.recalculate")}
                      endIcon={<ButtonCtaIcon fontSize="large" />}
                      isLoading={isLoadingById(billingId, recalculateBillingsInitialViewState)}
                      disabled={billingInitialDetail.statusType !== StatusType.DRAFT}
                      onClick={() => recalculateInitialBillingById(billingId)}
                    />
                  </Grid>
                  {billingInitialDetail.statusType !== StatusType.APPROVED && (
                    <Grid item>
                      <PrimaryButtonLoading
                        startIcon={<ActivateIcon fontSize="large" />}
                        label={t("detail.button.share")}
                        endIcon={<ButtonCtaIcon fontSize="large" />}
                        isLoading={approveBillingsInitialViewState.isLoading}
                        disabled={billingInitialDetail.statusType !== StatusType.DRAFT}
                        onClick={() => approveInitialBillingById(billingId)}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <PrimaryButtonLoading
                      startIcon={<DeactivateIcon fontSize="large" />}
                      label={t("detail.button.cancel")}
                      endIcon={<ButtonCtaIcon fontSize="large" />}
                      isLoading={isLoadingById(billingId, cancelBillingsInitialViewState)}
                      disabled={billingInitialDetail.statusType !== StatusType.APPROVED}
                      onClick={() => cancelInitialBillingById(billingId)}
                    />
                  </Grid>
                  <Grid item>
                    <PrimaryButtonLoading
                      startIcon={<SendIcon fontSize="large" />}
                      label={t("detail.button.submitToSAP")}
                      endIcon={<ButtonCtaIcon fontSize="large" />}
                      isLoading={isLoadingById(billingId, sapSendBillingsInitialViewState)}
                      disabled={
                        billingInitialDetail.statusType !== StatusType.APPROVED ||
                        billingInitialDetail.accountingStatus === StatusType.CREATED
                      }
                      onClick={() => submitInitialBillingToSAP(billingId)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <PrimaryButtonLoading
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("detail.button.delete")}
                  endIcon={<ButtonCtaIcon fontSize="large" />}
                  isLoading={deleteBillingsInitialViewState.isLoading}
                  disabled={billingInitialDetail.statusType !== StatusType.DRAFT}
                  onClick={() => {
                    deleteInitialBillingById(billingId)
                    getInitialBilling(billingId)
                  }}
                />
              </Grid>
            </AlignBetweenBox>
          </SmallPaddedBox>
        </>
      ))}
    </>
  )
}
