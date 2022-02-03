import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { Menu, MenuItem, Typography, Grid } from "@mui/material"
import { useTranslation } from "react-i18next"
import { StatusView } from "../../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../../uikit/page/PageHeaderFilterBox"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { SuccessAlert, TableRowErrorAlert } from "../../../uikit/Shared.Alert"
import { DEFAULT_ROWS_PER_PAGE } from "../../../uikit/Shared.Consts"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../../uikit/table/Table.PaginationView"
import { TableRowView, TableRowClickable } from "../../../uikit/table/Table.RowView"
import { firstViewState } from "../../Shared.Reducer"
import { BillingsRecurringListState } from "./BillingsRecurringList.Reducer"
import { BillingsRecurringListItem } from "../../../domain/billings/recurring/BillingsRecurring.Model"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { OpenIcon } from "../../../uikit/Shared.Icon"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryPlusButton } from "../../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./BillingsRecurringList.Connect"

enum BillingsRecurringColumns {
  STATUS_TYPE = "STATUS_TYPE",
  PERIOD = "PERIOD",
  NUMBER_OF_ZEVS = "NUMBER_OF_ZEVS",
}

interface BillingsRecurringListComponentProps
  extends BillingsRecurringListState,
    ReturnType<typeof mapDispatchToProps> {}

export const BillingsRecurringListComponent = (props: BillingsRecurringListComponentProps) => {
  const { t } = useTranslation("billings-recurring")

  const {
    viewState,
    getRecurringBillings,
    navigateToRecurringBilling,
    navigateToRecurringBillingCreate,
    navigateToZev,
    showDeleteSuccess,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getRecurringBillings()
    }
  }, [viewState])

  const billingRecurringList = useMemo(
    () =>
      viewState.domainResult?.billingsRecurring?.map((billingsRecurring) => ({
        ...billingsRecurring,
        sortableStatusType: t(`shared:status.${billingsRecurring.statusType}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsRecurringColumns>>({
    column: BillingsRecurringColumns.PERIOD,
    direction: "desc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders: TableHeader<BillingsRecurringColumns>[] = [
    {
      column: BillingsRecurringColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "15%",
    },
    {
      column: BillingsRecurringColumns.PERIOD,
      label: t("list.label.period"),
      width: "65%",
    },
    {
      column: BillingsRecurringColumns.NUMBER_OF_ZEVS,
      label: t("list.label.number-of-zevs"),
      width: "20%",
      align: "right",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsRecurringColumns.STATUS_TYPE:
        return (a: BillingsRecurringListItem, b: BillingsRecurringListItem) =>
          ORDERED_STRING_COMPARATOR(a.sortableStatusType, b.sortableStatusType, orderBy.direction)
      case BillingsRecurringColumns.PERIOD:
        return (a: BillingsRecurringListItem, b: BillingsRecurringListItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortablePeriod, b.sortablePeriod, orderBy.direction)
      case BillingsRecurringColumns.NUMBER_OF_ZEVS:
        return (a: BillingsRecurringListItem, b: BillingsRecurringListItem) =>
          ORDERED_NUMBER_COMPARATOR(a.zevs.length, b.zevs.length, orderBy.direction)
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openZevListMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeZevListMenu = () => {
    setAnchorEl(null)
  }
  const [zevListMenuItems, setZevListMenuItems] = useState<
    {
      id: string
      name: string
    }[]
  >([])
  return (
    <>
      {showDeleteSuccess && <SuccessAlert message={t("list.action.delete.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        >
          <SmallPaddedBox>
            <PrimaryPlusButton onClick={navigateToRecurringBillingCreate} />
          </SmallPaddedBox>
        </PageHeaderFilterBox>
        <TableContainer>
          <TableFixed>
            <TableHeaderView<BillingsRecurringColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert
                colSpan={3}
                retry={() => getRecurringBillings()}
                message={viewState.domainError.message}
              />
            )}
            <TableRowView<BillingsRecurringListItem>
              colSpan={3}
              rows={billingRecurringList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(billingRecurringItem) => (
                <TableRowClickable<BillingsRecurringListItem>
                  key={billingRecurringItem.id}
                  rowData={billingRecurringItem}
                  rowClick={(billingRecurringItem) => navigateToRecurringBilling(billingRecurringItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={billingRecurringItem.statusType} />
                  </TableCell>
                  <TableCell align="left">{billingRecurringItem.period}</TableCell>
                  <TableCell align="right">
                    <SecondaryButton
                      disabled={billingRecurringItem.zevs.length === 0}
                      label={`${billingRecurringItem.zevs.length}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setZevListMenuItems(billingRecurringItem.zevs)
                        openZevListMenu(event)
                      }}
                    />
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={billingRecurringList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeZevListMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {zevListMenuItems.map((zev) => (
          <MenuItem
            key={zev.id}
            onClick={(event) => {
              event.stopPropagation()
              closeZevListMenu()
              navigateToZev(zev.id)
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              sx={{
                width: 240,
              }}
            >
              <Typography variant="body1">{zev.name}</Typography>
              <OpenIcon color="primary" />
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
