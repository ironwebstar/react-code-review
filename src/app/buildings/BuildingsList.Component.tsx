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
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { BuildingListItem } from "../../domain/buildings/Buildings.Model"
import { BuildingsListState } from "./BuildingsList.Reducer"
import { StatusView } from "../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { mapDispatchToProps } from "./BuildingsList.Connect"
import { OpenButton } from "../../uikit/button/OpenButton"
import { StatusType } from "../../domain/Domain.Model"

enum BuildingsColumns {
  STATUS_TYPE = "STATUS_TYPE",
  BUILDING_OBJECT = "BUILDING_OBJECT",
  ADDRESS = "ADDRESS",
  ZEV = "ZEV",
}

interface BuildingsListComponentProps extends BuildingsListState, ReturnType<typeof mapDispatchToProps> {}

export const BuildingsListComponent = (props: BuildingsListComponentProps) => {
  const { t } = useTranslation("buildings")

  const { viewState, getBuildings, navigateToBuilding, navigateToZev, showDeleteSuccess } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getBuildings()
    }
  }, [viewState])

  const buildingList = useMemo(
    () =>
      viewState.domainResult?.buildings?.map((building) => ({
        ...building,
        statusTypeFilter: t(`shared:status.${StatusType[building.statusType]}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<BuildingsColumns>>({
    column: BuildingsColumns.BUILDING_OBJECT,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: BuildingsColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
    },
    {
      column: BuildingsColumns.BUILDING_OBJECT,
      label: t("list.label.building-object"),
      width: "30%",
    },
    {
      column: BuildingsColumns.ADDRESS,
      label: t("list.label.address"),
      width: "30%",
    },
    {
      column: BuildingsColumns.ZEV,
      label: t("field.label.zev"),
      width: "30%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BuildingsColumns.STATUS_TYPE:
        return (a: BuildingListItem, b: BuildingListItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case BuildingsColumns.BUILDING_OBJECT:
        return (a: BuildingListItem, b: BuildingListItem) =>
          ORDERED_STRING_COMPARATOR(a.buildingObject, b.buildingObject, orderBy.direction)
      case BuildingsColumns.ADDRESS:
        return (a: BuildingListItem, b: BuildingListItem) =>
          ORDERED_STRING_COMPARATOR(a.address, b.address, orderBy.direction)
      case BuildingsColumns.ZEV:
        return (a: BuildingListItem, b: BuildingListItem) =>
          ORDERED_STRING_COMPARATOR(a.zevName, b.zevName, orderBy.direction)
    }
  }

  return (
    <>
      {showDeleteSuccess && <SuccessAlert message={t("list.action.delete.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <TableContainer>
          <TableFixed>
            <TableHeaderView<BuildingsColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert colSpan={4} retry={() => getBuildings()} message={viewState.domainError.message} />
            )}
            <TableRowView<BuildingListItem>
              colSpan={4}
              rows={buildingList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(buildingItem) => (
                <TableRowClickable<BuildingListItem>
                  key={buildingItem.id}
                  rowData={buildingItem}
                  rowClick={(buildingItem) => navigateToBuilding(buildingItem.zevId, buildingItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={buildingItem.statusType} />
                  </TableCell>
                  <TableCell align="left">{buildingItem.buildingObject}</TableCell>
                  <TableCell align="left">{buildingItem.address}</TableCell>
                  <TableCell align="left">
                    <OpenButton label={buildingItem.zevName} open={() => navigateToZev(buildingItem.zevId)} />
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={buildingList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
