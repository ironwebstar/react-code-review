import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { TableContainer } from "@mui/material"
import { Redirect } from "react-router"
import { Box } from "@mui/material"
import { AppRouteParams } from "../../App.Routes"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { SpaceBetweenBox } from "../../../uikit/box/AlignmentBox"
import { StatusView } from "../../../uikit/label/StatusView"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { ErrorAlert, SuccessAlert } from "../../../uikit/Shared.Alert"
import { ImpressionHeader } from "../../../uikit/typography/Header"
import { firstViewState } from "../../Shared.Reducer"
import { coerce } from "../../Shared.View"
import { BillingsRecurringDetailState } from "./BillingsRecurringDetail.Reducer"
import { TableColumnSort, TableHeaderView, TableHeader } from "../../../uikit/table/Table.HeaderView"
import { DEFAULT_ROWS_PER_PAGE } from "../../../uikit/Shared.Consts"
import { PageRowSlice } from "../../../uikit/table/Table.PaginationView"
import { ORDERED_STRING_COMPARATOR, ORDERED_NUMBER_COMPARATOR } from "../../../domain/Domain.Comparators"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableRowView } from "../../../uikit/table/Table.RowView"
import { ServiceBillingItemView } from "./views/ServiceBillingItemView"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { PrimaryButtonLoading } from "../../../uikit/button/PrimaryButtonLoading"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { SendIcon, ButtonCtaIcon, RemoveIcon } from "../../../uikit/Shared.Icon"
import { StatusType } from "../../../domain/Domain.Model"
import { ProgressIndicator } from "../../../uikit/progress/ProgressIndicator"
import { mapDispatchToProps } from "./BillingsRecurringDetail.Connect"
import { PageHeaderFilterBox } from "../../../uikit/page/PageHeaderFilterBox"
import { ServiceBilling } from "../../../domain/billings/recurring/BillingsRecurring.Model"

enum BillingServicesColumns {
  STATUS = "STATUS",
  BILLING_NUMBER = "BILLING_NUMBER",
  PERIOD = "PERIOD",
  ZEV = "ZEV",
  TOTAL_AMOUNT = "TOTAL_AMOUNT",
  BILLING_STATUS = "BILLING_STATUS",
  ACTION = "ACTION",
}

interface BillingsRecurringDetailProps
  extends BillingsRecurringDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BillingsRecurringDetailComponent = (props: BillingsRecurringDetailProps) => {
  const { t } = useTranslation("billings-recurring")
  const {
    viewState,
    deleteBillingsRecurringViewState,
    deleteBillingsRecurringById,
    approveBillingsRecurringViewState,
    approveServiceBillingsRunById,
    sapSendAllBillingsRunRecurringViewState,
    sapSendAllServiceBillings,
    sapSendBillingsRecurringViewState,
    sapSendServiceBillingsById,
    recalculateBillingsRecurringViewState,
    recalculateServiceBillingsById,
    cancelBillingsRecurringViewState,
    cancelServiceBillingsById,
    removeServiceBillingRunZevViewState,
    removeServiceBillingRunZevById,
    match,
    getRecurringBilling,
    expandBillingServiceRow,
    expandedRows,
    navigateToZev,
    allBillingRunsRemoved,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getRecurringBilling(match.params.billingId)
    }
  }, [viewState])

  useEffect(() => {
    if (sapSendBillingsRecurringViewState.domainResult) {
      getRecurringBilling(match.params.billingId)
    }
  }, [sapSendBillingsRecurringViewState.domainResult])

  const billingServices = useMemo(
    () =>
      viewState.domainResult?.serviceBillings?.map((serviceBilling) => ({
        ...serviceBilling,
        billingType: t(`billingType.${serviceBilling.billingType}`),
        sortableStatusType: t(`shared:status.${serviceBilling.statusType}`),
        sortableAccountingStatus: t(`accountingStatus.${serviceBilling.accountingStatus}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingServicesColumns>>({
    column: BillingServicesColumns.STATUS,
    direction: "asc",
  })

  const [pageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")
  const isStateDraft = useMemo(
    () => viewState.domainResult && viewState.domainResult.statusType === StatusType.DRAFT,
    [viewState.domainResult],
  )

  const tableHeaders: TableHeader<BillingServicesColumns>[] = [
    {
      column: BillingServicesColumns.STATUS,
      label: t("field.label.status"),
      width: "10%",
    },
    {
      column: BillingServicesColumns.BILLING_NUMBER,
      label: t("field.label.billingNumber"),
      width: "15%",
    },
    {
      column: BillingServicesColumns.PERIOD,
      label: t("field.label.period"),
      width: "20%",
    },
    {
      column: BillingServicesColumns.ZEV,
      label: t("field.label.zev"),
      width: "25%",
    },
    {
      column: BillingServicesColumns.TOTAL_AMOUNT,
      label: t("field.label.totalAmount"),
      width: "10%",
      align: "right",
    },
    {
      column: BillingServicesColumns.BILLING_STATUS,
      label: t("field.label.billingStatus"),
      width: "15%",
    },
    {
      column: BillingServicesColumns.ACTION,
      label: "",
      width: "5%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingServicesColumns.STATUS:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case BillingServicesColumns.BILLING_NUMBER:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_STRING_COMPARATOR(a.invoiceReferenceNumber, b.invoiceReferenceNumber, orderBy.direction)
      case BillingServicesColumns.PERIOD:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_NUMBER_COMPARATOR(a.sortablePeriod, b.sortablePeriod, orderBy.direction)
      case BillingServicesColumns.ZEV:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_STRING_COMPARATOR(a.zevName, b.zevName, orderBy.direction)
      case BillingServicesColumns.TOTAL_AMOUNT:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableTotalAmountDue, b.sortableTotalAmountDue, orderBy.direction)
      case BillingServicesColumns.BILLING_STATUS:
        return (a: ServiceBilling, b: ServiceBilling) =>
          ORDERED_STRING_COMPARATOR(a.sortableAccountingStatus, b.sortableAccountingStatus, orderBy.direction)
      case BillingServicesColumns.ACTION:
        return (a: ServiceBilling, b: ServiceBilling) => ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  if (viewState.isLoading) return <ProgressIndicator />
  if (viewState.domainError)
    return (
      <ErrorAlert retry={() => getRecurringBilling(match.params.billingId)} message={viewState.domainError.message} />
    )
  if (deleteBillingsRecurringViewState.domainResult) return <Redirect to="/billings/recurring" />
  if (allBillingRunsRemoved) return <Redirect to="/billings/recurring" />
  return (
    <>
      {deleteBillingsRecurringViewState.domainError && (
        <ErrorAlert message={deleteBillingsRecurringViewState.domainError.message} />
      )}
      {approveBillingsRecurringViewState.domainResult && <SuccessAlert message={t("details.action.approve.success")} />}
      {approveBillingsRecurringViewState.domainError && (
        <ErrorAlert message={approveBillingsRecurringViewState.domainError.message} />
      )}
      {sapSendAllBillingsRunRecurringViewState.domainResult && (
        <SuccessAlert message={t("details.action.billingSap.success")} />
      )}
      {sapSendAllBillingsRunRecurringViewState.domainError && (
        <ErrorAlert message={sapSendAllBillingsRunRecurringViewState.domainError.message} />
      )}
      {coerce(viewState.domainResult, (billingRecurringDetail) => (
        <PaperBox>
          <SpaceBetweenBox>
            <SmallPaddedBox>
              <StatusView statusType={billingRecurringDetail.statusType} />
            </SmallPaddedBox>
            <SmallPaddedBox>
              <PrimaryButtonLoading
                startIcon={<RemoveIcon fontSize="large" />}
                label={t("details.button.extinguish")}
                isLoading={deleteBillingsRecurringViewState.isLoading}
                disabled={!isStateDraft}
                onClick={() =>
                  deleteBillingsRecurringById(
                    billingRecurringDetail.id,
                    t("details.action.delete.confirm"),
                    t("details.action.delete.confirm.cta"),
                  )
                }
              />
            </SmallPaddedBox>
          </SpaceBetweenBox>
          <ImpressionHeader>{billingRecurringDetail.period}</ImpressionHeader>
          <PageHeaderFilterBox
            id="list-title"
            headerTitle={t("detail.subtitle")}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
          <TableContainer>
            <TableFixed>
              <TableHeaderView<BillingServicesColumns>
                isLoading={viewState.isLoading}
                headers={tableHeaders}
                orderBy={orderBy}
                orderByChanged={(orderBy) => setOrderBy(orderBy)}
              />
              <TableRowView<ServiceBilling>
                colSpan={7}
                rows={billingServices}
                pageRowSlice={pageRowSlice}
                comparator={columnComparator}
                filterQuery={filterQuery}
                render={(serviceBilling) => (
                  <ServiceBillingItemView
                    billingRunId={billingRecurringDetail.id}
                    key={serviceBilling.id}
                    serviceBilling={serviceBilling}
                    billingServiceExpanded={expandedRows.get(serviceBilling.id) === true}
                    rowClick={(service) =>
                      expandBillingServiceRow(service.id, !(expandedRows.get(serviceBilling.id) === true))
                    }
                    sapSendBillingsRecurringViewState={sapSendBillingsRecurringViewState}
                    sapSendServiceBillingsById={sapSendServiceBillingsById}
                    recalculateBillingsRecurringViewState={recalculateBillingsRecurringViewState}
                    recalculateServiceBillingsById={recalculateServiceBillingsById}
                    cancelBillingsRecurringViewState={cancelBillingsRecurringViewState}
                    cancelServiceBillingsById={cancelServiceBillingsById}
                    removeServiceBillingRunZevViewState={removeServiceBillingRunZevViewState}
                    removeServiceBillingRunZevById={removeServiceBillingRunZevById}
                    navigateToZev={navigateToZev}
                  />
                )}
              />
            </TableFixed>
          </TableContainer>
          <Box mt={16}>
            <SmallPaddedBox>
              <AlignEndBox>
                {isStateDraft && (
                  <PrimaryButtonLoading
                    label={t("details.button.shareAll")}
                    disabled={!isStateDraft}
                    isLoading={approveBillingsRecurringViewState.isLoading}
                    onClick={() => approveServiceBillingsRunById(billingRecurringDetail.id)}
                  />
                )}
                <DividerBox />
                <PrimaryButtonLoading
                  startIcon={<SendIcon fontSize="large" />}
                  label={t("details.button.submitAllToSAP")}
                  endIcon={<ButtonCtaIcon fontSize="large" />}
                  isLoading={sapSendAllBillingsRunRecurringViewState.isLoading}
                  disabled={
                    billingRecurringDetail.serviceBillings.length === 0 ||
                    billingRecurringDetail.statusType !== StatusType.APPROVED
                  }
                  onClick={() => sapSendAllServiceBillings(billingRecurringDetail.id)}
                />
              </AlignEndBox>
            </SmallPaddedBox>
          </Box>
        </PaperBox>
      ))}
    </>
  )
}
