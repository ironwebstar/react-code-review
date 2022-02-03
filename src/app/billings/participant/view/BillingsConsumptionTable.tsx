import { TableContainer, TableCell, IconButton, TableRow, Typography, Divider } from "@mui/material"
import { TableCellProps } from "@mui/material/TableCell"
import { BoxProps } from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { BillingsConsumptionItem } from "../../../../domain/billings/participant/BillingsParticipant.Model"
import { DataItemBox } from "../../../../uikit/box/DataItemBox"
import { TextButton } from "../../../../uikit/button/TextButton"
import { ErrorAlert } from "../../../../uikit/Shared.Alert"
import { ArrowDownIcon, ArrowUpIcon } from "../../../../uikit/Shared.Icon"
import { ORDERED_STRING_COMPARATOR, ORDERED_NUMBER_COMPARATOR } from "../../../../domain/Domain.Comparators"
import { TableFixed } from "../../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../../uikit/table/Table.HeaderView"
import { TableRowView, TableRowClickable } from "../../../../uikit/table/Table.RowView"
import { ViewStateMap } from "../../../Shared.Reducer"
import { ConsumptionOverviewChartView } from "./ConsumptionOverviewChartView"
import { PdfIcon } from "./PdfIcon"
import { BillingsConsumptionPaidCell } from "./BillingsConsumptionPaidCell"
import { TableActionView } from "../../../../uikit/table/TableActionView"
import { TinyPaddedBox, SmallPaddedBox } from "../../../../uikit/box/PaddedBox"

enum BillingsConsumptionColumns {
  CONSUMPTION_POINT_NAME = "CONSUMPTION_POINT_NAME",
  BUILDING_NAME = "BUILDING_NAME",
  PARTICIPANT_NAME = "PARTICIPANT_NAME",
  DETAILS = "DETAILS",
  TOTAL_CONSUMPTION = "TOTAL_CONSUMPTION",
  TOTAL_PRICE = "TOTAL_PRICE",
  SAP_STATUS = "SAP_STATUS",
  STATUS = "STATUS",
  DOWNLOAD_PDF = "DOWNLOAD_PDF",
}

interface BillingsConsumptionTableProps {
  allConsumption: BillingsConsumptionItem[]
  billPdfViewStateMap: ViewStateMap<string, boolean>
  downloadBillPdf: (billId: string) => void
  billingsConsumptionPaid?: {
    paid: (billId: string) => void
    unpaid: (billId: string) => void
    billPaidViewStateMap: ViewStateMap<string, boolean>
  }
  noAction: boolean
}

const TableCellBaseLine = styled(TableCell)<TableCellProps>(() => ({
  verticalAlign: "baseline",
}))

const SmokeSmallPaddedBox = styled(SmallPaddedBox)<BoxProps>(() => ({
  backgroundColor: "#fafafb",
  margin: 8,
}))

export const BillingsConsumptionTable = (props: BillingsConsumptionTableProps) => {
  const { t } = useTranslation("billings-participant")
  const { allConsumption, downloadBillPdf, billPdfViewStateMap, billingsConsumptionPaid, noAction } = props
  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsConsumptionColumns>>({
    column: BillingsConsumptionColumns.CONSUMPTION_POINT_NAME,
    direction: "asc",
  })
  const [selectedBillingsConsumptionItem, setSelectedBillingsConsumptionItem] = useState<string[]>([])

  const tableHeaders: TableHeader<BillingsConsumptionColumns>[] = [
    {
      column: BillingsConsumptionColumns.CONSUMPTION_POINT_NAME,
      label: t("detail.all.consumption.list.label.consumptionPoint"),
      width: "20%",
    },
    {
      column: BillingsConsumptionColumns.BUILDING_NAME,
      label: t("detail.all.consumption.list.label.buildingName"),
      width: "15%",
    },
    {
      column: BillingsConsumptionColumns.PARTICIPANT_NAME,
      label: t("detail.all.consumption.list.label.participant"),
      width: billingsConsumptionPaid ? "25%" : "30%",
    },
    {
      column: BillingsConsumptionColumns.DETAILS,
      label: "",
      width: "5%",
      orderable: false,
    },
    {
      column: BillingsConsumptionColumns.TOTAL_CONSUMPTION,
      label: t("detail.all.consumption.list.label.kwh"),
      width: "10%",
      align: "right",
    },
    {
      column: BillingsConsumptionColumns.TOTAL_PRICE,
      label: t("detail.all.consumption.list.label.price"),
      width: "10%",
      align: "right",
    },
    {
      column: BillingsConsumptionColumns.SAP_STATUS,
      label: t("detail.all.consumption.list.label.sapStatus"),
      width: "15%",
    },
    {
      column: BillingsConsumptionColumns.STATUS,
      label: billingsConsumptionPaid ? t("detail.all.consumption.list.label.status") : "",
      width: billingsConsumptionPaid ? "10%" : "0%",
      orderable: false,
      align: "right",
    },
    {
      column: BillingsConsumptionColumns.DOWNLOAD_PDF,
      label: "",
      width: "5%",
      align: "right",
      orderable: false,
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsConsumptionColumns.CONSUMPTION_POINT_NAME:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.consumptionPointName, b.consumptionPointName, orderBy.direction)
      case BillingsConsumptionColumns.BUILDING_NAME:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.buildingName, b.buildingName, orderBy.direction)
      case BillingsConsumptionColumns.PARTICIPANT_NAME:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.participantName, b.participantName, orderBy.direction)
      case BillingsConsumptionColumns.TOTAL_CONSUMPTION:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_NUMBER_COMPARATOR(a.totalConsumptionSortValue, b.totalConsumptionSortValue, orderBy.direction)
      case BillingsConsumptionColumns.TOTAL_PRICE:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.totalCosts, b.totalCosts, orderBy.direction)
      case BillingsConsumptionColumns.SAP_STATUS:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.accountingStatus, b.accountingStatus, orderBy.direction)
      default:
        return (a: BillingsConsumptionItem, b: BillingsConsumptionItem) =>
          ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <TableContainer>
      <TableFixed>
        <TableHeaderView<BillingsConsumptionColumns>
          isLoading={false}
          headers={tableHeaders}
          orderBy={orderBy}
          orderByChanged={(orderBy) => setOrderBy(orderBy)}
        />
        <TableRowView<BillingsConsumptionItem>
          colSpan={8}
          rows={allConsumption}
          pageRowSlice={{
            start: 0,
            end: 100,
          }}
          comparator={columnComparator}
          render={(billingsConsumptionItem) => {
            const containsBillingPaidError =
              billingsConsumptionPaid &&
              billingsConsumptionPaid.billPaidViewStateMap.domainError.get(billingsConsumptionItem.billId)
            return (
              <Fragment key={billingsConsumptionItem.billId}>
                {billPdfViewStateMap.domainError.get(billingsConsumptionItem.billId) && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <ErrorAlert
                        message={billPdfViewStateMap.domainError.get(billingsConsumptionItem.billId)?.message ?? ""}
                      />
                    </TableCell>
                  </TableRow>
                )}
                {containsBillingPaidError && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <ErrorAlert
                        message={
                          billingsConsumptionPaid.billPaidViewStateMap.domainError.get(billingsConsumptionItem.billId)
                            ?.message ?? ""
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
                <TableRowClickable<BillingsConsumptionItem>
                  key={billingsConsumptionItem.id}
                  rowData={billingsConsumptionItem}
                  rowClick={(billingsConsumptionItem) => {
                    if (selectedBillingsConsumptionItem.includes(billingsConsumptionItem.id)) {
                      setSelectedBillingsConsumptionItem(
                        selectedBillingsConsumptionItem.filter((value) => value !== billingsConsumptionItem.id),
                      )
                    } else {
                      setSelectedBillingsConsumptionItem(
                        selectedBillingsConsumptionItem.concat([billingsConsumptionItem.id]),
                      )
                    }
                  }}
                >
                  <TableCell align="left">{billingsConsumptionItem.consumptionPointName}</TableCell>
                  <TableCell align="left">{billingsConsumptionItem.buildingName}</TableCell>
                  <TableCell align="left">{billingsConsumptionItem.participantName}</TableCell>
                  <TableCell align="left">
                    <TextButton
                      startIcon={
                        selectedBillingsConsumptionItem.includes(billingsConsumptionItem.id) ? (
                          <ArrowDownIcon fontSize="large" />
                        ) : (
                          <ArrowUpIcon fontSize="large" />
                        )
                      }
                      label={t("detail.all.consumption.list.label.details")}
                      onClick={() => void 0}
                    />
                  </TableCell>
                  <TableCell align="right">{billingsConsumptionItem.totalConsumption}</TableCell>
                  <TableCell align="right">{billingsConsumptionItem.totalCosts}</TableCell>
                  <TableCell align="left">{billingsConsumptionItem.accountingStatus}</TableCell>
                  {billingsConsumptionPaid && !noAction && (
                    <BillingsConsumptionPaidCell
                      isLoading={
                        billingsConsumptionPaid.billPaidViewStateMap.isLoading.get(billingsConsumptionItem.billId) ===
                        true
                      }
                      billId={billingsConsumptionItem.billId}
                      paid={
                        billingsConsumptionPaid.billPaidViewStateMap.domainResult.get(billingsConsumptionItem.billId) ??
                        false
                      }
                      payOrUnpaidToggle={(billId: string, paid: boolean) => {
                        if (paid) {
                          billingsConsumptionPaid.paid(billId)
                        } else {
                          billingsConsumptionPaid.unpaid(billId)
                        }
                      }}
                    />
                  )}
                  {!billingsConsumptionPaid && <TableCell />}
                  <TableCell align="right">
                    <TableActionView
                      isLoading={billPdfViewStateMap.isLoading.get(billingsConsumptionItem.billId) ?? false}
                    >
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation()
                          downloadBillPdf(billingsConsumptionItem.billId)
                        }}
                      >
                        <PdfIcon />
                      </IconButton>
                    </TableActionView>
                  </TableCell>
                </TableRowClickable>
                {selectedBillingsConsumptionItem.includes(billingsConsumptionItem.id) && (
                  <TableRow>
                    <TableCellBaseLine colSpan={1}>
                      <DataItemBox title={t("list.all.label.period")} value={billingsConsumptionItem.period} />
                      <Divider orientation="vertical" flexItem />
                    </TableCellBaseLine>
                    <TableCellBaseLine colSpan={4}>
                      <ConsumptionOverviewChartView billingsConsumptionItem={billingsConsumptionItem} />
                    </TableCellBaseLine>
                    <TableCellBaseLine colSpan={3}>
                      {billingsConsumptionItem.accountingErrorMessage ? (
                        <TinyPaddedBox m={1} bgcolor="whitesmoke">
                          <Typography variant="subtitle2" gutterBottom color="textPrimary">
                            {t("accounting-error")}
                          </Typography>
                          {billingsConsumptionItem.accountingErrorMessage}
                        </TinyPaddedBox>
                      ) : (
                        <>
                          <SmokeSmallPaddedBox>
                            <Typography variant="subtitle2" color="textPrimary" sx={{ textTransform: "uppercase" }}>
                              {t("sap-billing-id")}
                            </Typography>
                            {billingsConsumptionItem.orderReferenceNumber}
                          </SmokeSmallPaddedBox>
                          <SmokeSmallPaddedBox>
                            <Typography variant="subtitle2" color="textPrimary" sx={{ textTransform: "uppercase" }}>
                              {t("sap-invoice-id")}
                            </Typography>
                            {billingsConsumptionItem.invoiceReferenceNumber}
                          </SmokeSmallPaddedBox>
                        </>
                      )}
                    </TableCellBaseLine>
                  </TableRow>
                )}
              </Fragment>
            )
          }}
        />
      </TableFixed>
    </TableContainer>
  )
}
