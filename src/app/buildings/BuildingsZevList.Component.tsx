import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { useTranslation } from "react-i18next"
import { TableColumnSort } from "../../uikit/table/Table.HeaderView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { StatusView } from "../../uikit/label/StatusView"
import { BuildingsZevListState } from "./BuildingsZevList.Reducer"
import { BuildingZevListItem } from "../../domain/buildings/Buildings.Model"
import { SpaceBetweenMiddleBox } from "../../uikit/box/AlignmentBox"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { Box } from "@mui/material"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./BuildingsZevList.Connect"

enum BuildingsZevColumns {
  STATUS_TYPE = "STATUS_TYPE",
  BUILDING_OBJECT = "BUILDING_OBJECT",
  STREET = "STREET",
  CITY = "CITY",
}

interface BuildingsZevListComponentProps extends BuildingsZevListState, ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const BuildingsZevListComponent = (props: BuildingsZevListComponentProps) => {
  const { t } = useTranslation("buildings")

  const { viewState, getZevBuildings, navigateToBuilding, zevId, navigateToCreateBuilding } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevBuildings(zevId)
    }
  }, [viewState])

  const buildingList = useMemo(() => viewState.domainResult?.buildings ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<BuildingsZevColumns>>({
    column: BuildingsZevColumns.BUILDING_OBJECT,
    direction: "asc",
  })

  const tableHeaders = [
    {
      column: BuildingsZevColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
      orderable: false,
    },
    {
      column: BuildingsZevColumns.BUILDING_OBJECT,
      label: t("list.label.building-object"),
      width: "30%",
      orderable: false,
    },
    {
      column: BuildingsZevColumns.STREET,
      label: t("list.label.street"),
      width: "30%",
      orderable: false,
    },
    {
      column: BuildingsZevColumns.CITY,
      label: t("list.label.city"),
      width: "30%",
      orderable: false,
    },
  ]

  return (
    <PaperBox>
      <SpaceBetweenMiddleBox>
        <Box>
          <FormSectionTitle label={t("list.title")} />
        </Box>
        <SmallPaddedBox>
          <PrimaryPlusButton onClick={() => navigateToCreateBuilding(zevId)} />
        </SmallPaddedBox>
      </SpaceBetweenMiddleBox>
      <TableContainer>
        <TableFixed>
          <TableHeaderView<BuildingsZevColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && <TableRowErrorAlert colSpan={4} message={viewState.domainError.message} />}
          <TableRowView<BuildingZevListItem>
            colSpan={4}
            rows={buildingList}
            pageRowSlice={{
              start: 0,
              end: DEFAULT_ROWS_PER_PAGE,
            }}
            comparator={() => (a: BuildingZevListItem, b: BuildingZevListItem) =>
              ORDERED_STRING_COMPARATOR(a.buildingObject, b.buildingObject, orderBy.direction)}
            render={(buildingItem) => (
              <TableRowClickable<BuildingZevListItem>
                key={buildingItem.id}
                rowData={buildingItem}
                rowClick={(buildingItem) => navigateToBuilding(zevId, buildingItem.id)}
              >
                <TableCell align="left">
                  <StatusView statusType={buildingItem.statusType} />
                </TableCell>
                <TableCell align="left">{buildingItem.buildingObject}</TableCell>
                <TableCell align="left">{buildingItem.street}</TableCell>
                <TableCell align="left">{buildingItem.city}</TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
      </TableContainer>
    </PaperBox>
  )
}
