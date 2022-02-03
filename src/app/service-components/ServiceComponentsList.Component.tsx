import { ServiceComponentsListState } from "./ServiceComponentsList.Reducer"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { PaperBox } from "../../uikit/page/PaperBox"
import TableContainer from "@mui/material/TableContainer"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import TableCell from "@mui/material/TableCell"
import { useTranslation } from "react-i18next"
import { ServiceComponentListItem } from "../../domain/service-components/ServiceComponents.Model"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { mapDispatchToProps } from "./ServiceComponentsList.Connect"

enum ServiceComponentsColumns {
  SERVICE_COMPONENTS = "SERVICE_COMPONENTS",
}

interface ServiceComponentsProps extends ServiceComponentsListState, ReturnType<typeof mapDispatchToProps> {}

export const ServiceComponentsListComponent = (props: ServiceComponentsProps) => {
  const { t } = useTranslation("service-components")
  const { viewState, getServiceComponents, navigateToServiceComponent } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getServiceComponents()
    }
  }, [viewState])

  const serviceComponentsList = useMemo(() => viewState.domainResult?.serviceComponents ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<ServiceComponentsColumns>>({
    column: ServiceComponentsColumns.SERVICE_COMPONENTS,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: ServiceComponentsColumns.SERVICE_COMPONENTS,
      label: t("list.label.service-component"),
      width: "10%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ServiceComponentsColumns.SERVICE_COMPONENTS:
        return (a: ServiceComponentListItem, b: ServiceComponentListItem) =>
          ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
    }
  }

  return (
    <PaperBox>
      <PageHeaderFilterBox
        id="list-title"
        headerTitle={t("list.title")}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <TableContainer>
        <TableFixed>
          <TableHeaderView<ServiceComponentsColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && (
            <TableRowErrorAlert colSpan={1} retry={getServiceComponents} message={viewState.domainError.message} />
          )}
          <TableRowView<ServiceComponentListItem>
            id="list-table"
            colSpan={1}
            rows={serviceComponentsList}
            pageRowSlice={pageRowSlice}
            comparator={columnComparator}
            filterQuery={filterQuery}
            render={(serviceComponent) => (
              <TableRowClickable<ServiceComponentListItem>
                key={serviceComponent.id}
                rowData={serviceComponent}
                rowClick={(serviceComponent) => navigateToServiceComponent(serviceComponent.id)}
              >
                <TableCell align="left">{serviceComponent.name}</TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
        <TablePaginationView rowCount={serviceComponentsList.length} onPageRowSliceChanged={setPageRowSlice} />
      </TableContainer>
    </PaperBox>
  )
}
