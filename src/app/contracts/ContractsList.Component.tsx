import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { useTranslation } from "react-i18next"
import { TableColumnSort } from "../../uikit/table/Table.HeaderView"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { ContractItem } from "../../domain/contracts/Contracts.Models"
import { ContractsListState } from "./ContractsList.Reducer"
import { StatusView } from "../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { mapDispatchToProps } from "./ContractsList.Connect"
import { OpenButton } from "../../uikit/button/OpenButton"
import { StatusType } from "../../domain/Domain.Model"

enum ContractsColumns {
  STATUS_TYPE = "STATUS_TYPE",
  ZEV = "ZEV",
  START_DATE = "START DATE",
  END_DATE = "END DATE",
  PRODUCT = "PRODUCT",
}

interface ContractsListComponentProps extends ContractsListState, ReturnType<typeof mapDispatchToProps> {}

export const ContractsListComponent = (props: ContractsListComponentProps) => {
  const { t } = useTranslation("contracts")
  const { viewState, getInitialContracts, navigateToContract, navigateToZev, navigateToProduct, showDeleteSuccess } =
    props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getInitialContracts()
    }
  }, [viewState])

  const contractList = useMemo(
    () =>
      viewState.domainResult?.contracts?.map((contract) => ({
        ...contract,
        statusTypeFilter: t(`shared:status.${StatusType[contract.statusType]}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<ContractsColumns>>({
    column: ContractsColumns.STATUS_TYPE,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: ContractsColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "20%",
    },
    {
      column: ContractsColumns.ZEV,
      label: t("field.label.zev"),
      width: "20%",
    },
    {
      column: ContractsColumns.START_DATE,
      label: t("field.label.start-date"),
      width: "20%",
    },
    {
      column: ContractsColumns.END_DATE,
      label: t("field.label.end-date"),
      width: "20%",
    },
    {
      column: ContractsColumns.PRODUCT,
      label: t("field.label.product"),
      width: "20%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ContractsColumns.STATUS_TYPE:
        return (a: ContractItem, b: ContractItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case ContractsColumns.ZEV:
        return (a: ContractItem, b: ContractItem) => ORDERED_STRING_COMPARATOR(a.zevName, b.zevName, orderBy.direction)
      case ContractsColumns.START_DATE:
        return (a: ContractItem, b: ContractItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableStartDate, b.sortableStartDate, orderBy.direction)
      case ContractsColumns.END_DATE:
        return (a: ContractItem, b: ContractItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableEndDate, b.sortableEndDate, orderBy.direction)
      case ContractsColumns.PRODUCT:
        return (a: ContractItem, b: ContractItem) =>
          ORDERED_STRING_COMPARATOR(a.productName, b.productName, orderBy.direction)
    }
  }

  return (
    <>
      {showDeleteSuccess && <SuccessAlert message={t("detail.delete.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ContractsColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert
                colSpan={5}
                retry={() => getInitialContracts()}
                message={viewState.domainError.message}
              />
            )}
            <TableRowView<ContractItem>
              colSpan={5}
              rows={contractList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(contractItem) => (
                <TableRowClickable<ContractItem>
                  key={contractItem.id}
                  rowData={contractItem}
                  rowClick={(contractItem) => navigateToContract(contractItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={contractItem.statusType} />
                  </TableCell>
                  <TableCell align="left">
                    <OpenButton label={contractItem.zevName} open={() => navigateToZev(contractItem.zevId)} />
                  </TableCell>
                  <TableCell align="left">{contractItem.startDate}</TableCell>
                  <TableCell align="left">{contractItem.endDate}</TableCell>
                  <TableCell align="left">
                    <OpenButton
                      label={contractItem.productName}
                      open={() => navigateToProduct(contractItem.productId)}
                    />
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={contractList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
