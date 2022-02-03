import { TableCell, TableRow, IconButton, Box, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import { AccountingStatus, ServiceBilling } from "../../../../domain/billings/recurring/BillingsRecurring.Model"
import { TableRowClickable } from "../../../../uikit/table/Table.RowView"
import { AbortIcon, ButtonCtaIcon, RefreshIcon, SendIcon, DeactivateIcon } from "../../../../uikit/Shared.Icon"
import { SmallPaddedBox } from "../../../../uikit/box/PaddedBox"
import { domainErrorById, domainResultById, isLoadingById, ViewStateMap } from "../../../Shared.Reducer"
import { PrimaryButtonLoading } from "../../../../uikit/button/PrimaryButtonLoading"
import { Body1, Heading5, Subtitle1 } from "../../../../uikit/typography/Typography"
import { DividerBox } from "../../../../uikit/box/DividerBox"
import { DataItemBox } from "../../../../uikit/box/DataItemBox"
import { StatusView } from "../../../../uikit/label/StatusView"
import { StatusType } from "../../../../domain/Domain.Model"
import { BillingPositionsTableView } from "./BillingPositionTableView"
import { TableActionView } from "../../../../uikit/table/TableActionView"
import { AlignEndBox, SpaceBetweenBox } from "../../../../uikit/box/AlignmentBox"
import {
  ErrorAlert,
  OptionalErrorAlert,
  OptionalSuccessAlert,
  TableRowErrorAlert,
} from "../../../../uikit/Shared.Alert"
import { OpenButton } from "../../../../uikit/button/OpenButton"
import { ErrorButtonLoading } from "../../../../uikit/button/ErrorButtonLoading"

interface ServiceBillingItemViewProps {
  billingRunId: string
  serviceBilling: ServiceBilling
  billingServiceExpanded: boolean
  rowClick: (item: ServiceBilling) => void
  sapSendBillingsRecurringViewState: ViewStateMap<string, boolean>
  recalculateBillingsRecurringViewState: ViewStateMap<string, boolean>
  cancelBillingsRecurringViewState: ViewStateMap<string, boolean>
  removeServiceBillingRunZevViewState: ViewStateMap<string, boolean>
  sapSendServiceBillingsById: (billingId: string) => void
  recalculateServiceBillingsById: (billingId: string) => void
  cancelServiceBillingsById: (billingId: string) => void
  removeServiceBillingRunZevById: (billingRunId: string, zevId: string) => void
  navigateToZev: (zevId: string) => void
}

export const ServiceBillingItemView = (props: ServiceBillingItemViewProps) => {
  const { t } = useTranslation("billings-recurring")
  const {
    billingRunId,
    serviceBilling,
    billingServiceExpanded,
    rowClick,
    sapSendBillingsRecurringViewState,
    sapSendServiceBillingsById,
    recalculateBillingsRecurringViewState,
    recalculateServiceBillingsById,
    cancelBillingsRecurringViewState,
    cancelServiceBillingsById,
    removeServiceBillingRunZevViewState,
    removeServiceBillingRunZevById,
    navigateToZev,
  } = props

  return (
    <>
      {domainErrorById(serviceBilling.zevId, removeServiceBillingRunZevViewState) && (
        <TableRowErrorAlert
          colSpan={7}
          message={domainErrorById(serviceBilling.zevId, removeServiceBillingRunZevViewState)}
        />
      )}
      <TableRowClickable<ServiceBilling>
        key={serviceBilling.id}
        rowData={serviceBilling}
        rowClick={() => rowClick(serviceBilling)}
      >
        <TableCell>
          <StatusView statusType={serviceBilling.statusType} />
        </TableCell>
        <TableCell align="left">{serviceBilling.invoiceReferenceNumber}</TableCell>
        <TableCell align="left">{serviceBilling.period}</TableCell>
        <TableCell align="left">
          <OpenButton label={serviceBilling.zevName} open={() => navigateToZev(serviceBilling.zevId)} />
        </TableCell>
        <TableCell align="right">{serviceBilling.totalAmountDue}</TableCell>
        <TableCell align="left">{t(`accountingStatus.${serviceBilling.accountingStatus}`)}</TableCell>
        <TableCell align="center">
          {serviceBilling.zevId && serviceBilling.statusType === StatusType.DRAFT && (
            <TableActionView isLoading={isLoadingById(serviceBilling.zevId, removeServiceBillingRunZevViewState)}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation()
                  removeServiceBillingRunZevById(billingRunId, serviceBilling.zevId)
                }}
              >
                <AbortIcon color="secondary" />
              </IconButton>
            </TableActionView>
          )}
        </TableCell>
      </TableRowClickable>
      {billingServiceExpanded && (
        <>
          <TableRow>
            <TableCell colSpan={7}>
              <SmallPaddedBox>
                {serviceBilling.submissionError && (
                  <ErrorAlert
                    scrollOnDisplay
                    title={t("details.label.submission.error")}
                    message={
                      <Stack>
                        <Body1>{serviceBilling.submissionError}</Body1>
                        <DividerBox />
                        <Box>
                          <ErrorButtonLoading
                            startIcon={<SendIcon />}
                            onClick={() => sapSendServiceBillingsById(serviceBilling.id)}
                            label={t("details.button.retry")}
                            isLoading={isLoadingById(serviceBilling.id, sapSendBillingsRecurringViewState)}
                          />
                        </Box>
                      </Stack>
                    }
                  />
                )}
              </SmallPaddedBox>
              <SmallPaddedBox>
                <SpaceBetweenBox>
                  <DataItemBox title={t("field.label.period")} value={serviceBilling.period} />
                  <DataItemBox
                    title={t("field.label.type")}
                    // value={t(`billingType.${serviceBilling.billingType.toUpperCase()}`)}
                    value={serviceBilling.billingType}
                  />
                  <DataItemBox
                    title={t("field.label.orderReferenceNumber")}
                    value={serviceBilling.orderReferenceNumber}
                  />
                  <DataItemBox
                    title={t("field.label.invoiceReferenceNumber")}
                    value={serviceBilling.invoiceReferenceNumber}
                  />
                  <DataItemBox
                    title={t("field.label.billingStatus")}
                    value={t(`accountingStatus.${serviceBilling.accountingStatus}`)}
                  />
                </SpaceBetweenBox>
              </SmallPaddedBox>
              <SmallPaddedBox>
                <Subtitle1>{t("detail.invoiceItems")}</Subtitle1>
              </SmallPaddedBox>
              <BillingPositionsTableView billingPositions={serviceBilling.positions} />
              <DividerBox />
              <AlignEndBox>
                <Stack>
                  <Subtitle1
                    sx={{
                      textAlign: "end",
                    }}
                  >
                    {t("details.label.total")}
                  </Subtitle1>
                  <Heading5
                    sx={{
                      textAlign: "end",
                    }}
                  >
                    {serviceBilling.totalAmountDue}
                  </Heading5>
                </Stack>
              </AlignEndBox>
              <DividerBox />
              <OptionalSuccessAlert
                show={domainResultById(serviceBilling.id, cancelBillingsRecurringViewState)}
                message={t("details.action.cancel.success")}
              />
              <OptionalErrorAlert message={domainErrorById(serviceBilling.id, cancelBillingsRecurringViewState)} />
              <OptionalSuccessAlert
                scrollOnDisplay
                show={domainResultById(serviceBilling.id, recalculateBillingsRecurringViewState)}
                message={t("details.action.recalculate.success")}
              />
              <OptionalErrorAlert message={domainErrorById(serviceBilling.id, recalculateBillingsRecurringViewState)} />
              <OptionalSuccessAlert
                scrollOnDisplay
                show={domainResultById(serviceBilling.id, sapSendBillingsRecurringViewState)}
                message={t("details.action.serviceBillingSap.success")}
              />
              <OptionalErrorAlert message={domainErrorById(serviceBilling.id, sapSendBillingsRecurringViewState)} />
              <DividerBox />
              <SpaceBetweenBox>
                <Stack direction="row">
                  <PrimaryButtonLoading
                    startIcon={<DeactivateIcon fontSize="large" />}
                    label={t("details.button.cancel")}
                    endIcon={<ButtonCtaIcon fontSize="large" />}
                    isLoading={isLoadingById(serviceBilling.id, cancelBillingsRecurringViewState)}
                    disabled={serviceBilling.statusType !== StatusType.APPROVED}
                    onClick={() => cancelServiceBillingsById(serviceBilling.id)}
                  />
                  <DividerBox />
                  <PrimaryButtonLoading
                    startIcon={<RefreshIcon fontSize="large" />}
                    label={t("details.button.recalculate")}
                    endIcon={<ButtonCtaIcon fontSize="large" />}
                    isLoading={isLoadingById(serviceBilling.id, recalculateBillingsRecurringViewState)}
                    disabled={serviceBilling.statusType !== StatusType.DRAFT}
                    onClick={() => recalculateServiceBillingsById(serviceBilling.id)}
                  />
                </Stack>
                <Box>
                  <PrimaryButtonLoading
                    startIcon={<SendIcon fontSize="large" />}
                    label={t("details.button.submitToSAP")}
                    endIcon={<ButtonCtaIcon fontSize="large" />}
                    isLoading={isLoadingById(serviceBilling.id, sapSendBillingsRecurringViewState)}
                    disabled={
                      serviceBilling.statusType !== StatusType.APPROVED ||
                      serviceBilling.accountingStatus === AccountingStatus.CREATED
                    }
                    onClick={() => sapSendServiceBillingsById(serviceBilling.id)}
                  />
                </Box>
              </SpaceBetweenBox>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  )
}
