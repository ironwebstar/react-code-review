import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ZevsListState } from "./ZevsList.Reducer"
import { TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { ZevListItem } from "../../domain/zevs/ZevsList.Model"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { useTranslation } from "react-i18next"
import { TableColumnSort } from "../../uikit/table/Table.HeaderView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { StatusView } from "../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./ZevsList.Connect"
import { StatusType } from "../../domain/Domain.Model"

enum ZevColumns {
  STATUS_TYPE = "STATUS_TYPE",
  ZEV = "ZEV",
  ADDRESS = "ADDRESS",
}

interface ZevsListComponentProps extends ZevsListState, ReturnType<typeof mapDispatchToProps> {}

export const ZevsListComponent = (props: ZevsListComponentProps) => {
  const { t } = useTranslation("zevs")
  const { viewState, showZevDeletedAlert, getZevs, navigateToCreateZev, navigateToZev } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevs()
    }
  }, [viewState])

  const zevList = useMemo(
    () =>
      viewState.domainResult?.zevs?.map((zev) => ({
        ...zev,
        statusTypeFilter: t(`shared:status.${StatusType[zev.statusType]}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<ZevColumns>>({
    column: ZevColumns.ZEV,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const headers = [
    {
      column: ZevColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
    },
    {
      column: ZevColumns.ZEV,
      label: t("field.label.zev"),
      width: "40%",
    },
    {
      column: ZevColumns.ADDRESS,
      label: t("list.label.address"),
      width: "50%",
    },
  ]

  const tableComparator = () => {
    switch (orderBy.column) {
      case ZevColumns.STATUS_TYPE:
        return (a: ZevListItem, b: ZevListItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case ZevColumns.ZEV:
        return (a: ZevListItem, b: ZevListItem) => ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
      case ZevColumns.ADDRESS:
        return (a: ZevListItem, b: ZevListItem) => ORDERED_STRING_COMPARATOR(a.address, b.address, orderBy.direction)
    }
  }

  return (
    <>
      {showZevDeletedAlert && <SuccessAlert message={t("details.action.delete.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        >
          <SmallPaddedBox>
            <PrimaryPlusButton onClick={navigateToCreateZev} />
          </SmallPaddedBox>
        </PageHeaderFilterBox>
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ZevColumns>
              isLoading={viewState.isLoading}
              headers={headers}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert colSpan={3} retry={() => getZevs()} message={viewState.domainError.message} />
            )}
            <TableRowView<ZevListItem>
              colSpan={3}
              rows={zevList}
              pageRowSlice={pageRowSlice}
              comparator={tableComparator}
              filterQuery={filterQuery}
              render={(zevItem) => (
                <TableRowClickable<ZevListItem>
                  key={zevItem.id}
                  rowData={zevItem}
                  rowClick={(zevItem) => navigateToZev(zevItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={zevItem.statusType} />
                  </TableCell>
                  <TableCell align="left">{zevItem.name}</TableCell>
                  <TableCell align="left">{zevItem.address}</TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={zevList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
