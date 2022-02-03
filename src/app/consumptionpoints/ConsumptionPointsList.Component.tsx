import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { TableCell, TableContainer } from "@mui/material"
import { ConsumptionPointsListItem } from "../../domain/consumptionpoints/ConsumptionPoints.Model"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { StatusView } from "../../uikit/label/StatusView"
import { firstViewState } from "../Shared.Reducer"
import { AppRouteParams } from "../App.Routes"
import { mapDispatchToProps } from "./ConsumptionPointsList.Connect"
import { ConsumptionPointsListState } from "./ConsumptionPointsList.Reducer"
import { StatusType } from "../../domain/Domain.Model"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { OpenButton } from "../../uikit/button/OpenButton"

interface ConsumptionPointsListComponentProps
  extends ConsumptionPointsListState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

enum ConsumptionPointsListColumns {
  NAME = "NAME",
  TYPE = "TYPE",
  STATUS_TYPE = "STATUS_TYPE",
  PRICE_PACKAGE_ID = "PRICE_PACKAGE_ID",
  BUILDING = "BUILDING",
  ZEV = "ZEV",
}

export const ConsumptionPointsListComponent = (props: ConsumptionPointsListComponentProps) => {
  const { t } = useTranslation("consumptionpoints")
  const {
    viewState,
    getConsumptionPoints,
    navigateToZev,
    navigateToBuilding,
    navigateToConsumptionPoint,
    showDeleteAlert,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getConsumptionPoints()
    }
  }, [viewState])

  const consumptionPointsList = useMemo(
    () =>
      viewState.domainResult?.consumptionPoints?.map((consumptionPoint) => ({
        ...consumptionPoint,
        type: consumptionPoint.type ? t(`type.${consumptionPoint.type}`) : "-",
        statusTypeFilter: t(`shared:status.${StatusType[consumptionPoint.statusType]}`),
      })) ?? [],
    [viewState],
  )
  const [orderBy, setOrderBy] = useState<TableColumnSort<ConsumptionPointsListColumns>>({
    column: ConsumptionPointsListColumns.NAME,
    direction: "asc",
  })
  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: 25,
  })
  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: ConsumptionPointsListColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
    },
    {
      column: ConsumptionPointsListColumns.NAME,
      label: t("list.label.name"),
      width: "20%",
    },
    {
      column: ConsumptionPointsListColumns.TYPE,
      label: t("list.label.type"),
      width: "10%",
    },
    {
      column: ConsumptionPointsListColumns.PRICE_PACKAGE_ID,
      label: t("list.label.pricePackage"),
      width: "10%",
    },
    {
      column: ConsumptionPointsListColumns.BUILDING,
      label: t("list.label.building"),
      width: "30%",
    },
    {
      column: ConsumptionPointsListColumns.ZEV,
      label: t("list.label.zev"),
      width: "20%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ConsumptionPointsListColumns.STATUS_TYPE:
        return (a: ConsumptionPointsListItem, b: ConsumptionPointsListItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case ConsumptionPointsListColumns.NAME:
        return (a: ConsumptionPointsListItem, b: ConsumptionPointsListItem) =>
          ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
      case ConsumptionPointsListColumns.TYPE:
        return (a: ConsumptionPointsListItem, b: ConsumptionPointsListItem) =>
          ORDERED_STRING_COMPARATOR(a.type || "", b.type || "", orderBy.direction)
      default:
        return (a: ConsumptionPointsListItem, b: ConsumptionPointsListItem) =>
          ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <>
      {showDeleteAlert && <SuccessAlert message={t("list.success.alert")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ConsumptionPointsListColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert
                colSpan={6}
                retry={() => getConsumptionPoints()}
                message={viewState.domainError.message}
              />
            )}
            <TableRowView<ConsumptionPointsListItem>
              colSpan={6}
              rows={consumptionPointsList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(consumptionPoint) => (
                <TableRowClickable
                  key={consumptionPoint.id}
                  rowData={consumptionPoint}
                  rowClick={(consumptionPoint) =>
                    navigateToConsumptionPoint(consumptionPoint.building.id, consumptionPoint.id)
                  }
                >
                  <TableCell align="left">
                    <StatusView statusType={StatusType[consumptionPoint.statusType]} />
                  </TableCell>
                  <TableCell align="left">{consumptionPoint.name}</TableCell>
                  <TableCell align="left">{consumptionPoint.type}</TableCell>
                  <TableCell align="left">{consumptionPoint.pricePackage.name}</TableCell>
                  {consumptionPoint.building.name && consumptionPoint.building.id && consumptionPoint.zev.id ? (
                    <TableCell align="left">
                      <OpenButton
                        label={consumptionPoint.building.name}
                        open={() => navigateToBuilding(consumptionPoint.zev.id, consumptionPoint.building.id)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell align="left" />
                  )}
                  <TableCell align="left">
                    <OpenButton label={consumptionPoint.zev.name} open={() => navigateToZev(consumptionPoint.zev.id)} />
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={consumptionPointsList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
