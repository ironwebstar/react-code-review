import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Chip, TableCell, TableContainer, Stack } from "@mui/material"

import { ProductItem } from "../../domain/products/Products.Model"
import { ProductsListState } from "./ProductsList.Reducer"
import { firstViewState } from "../Shared.Reducer"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./ProductsList.Connect"

enum ProductsColumns {
  PRODUCT_LIST = "PRODUCT LIST",
  SERVICE_COMPONENT = "SERVICE COMPONENT",
}

interface ProductsProps extends ProductsListState, ReturnType<typeof mapDispatchToProps> {}

export const ProductListComponent = (props: ProductsProps) => {
  const { t } = useTranslation("products")
  const { viewState, getProducts, navigateToProduct, navigateToCreateProduct, showDeleteAlert } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getProducts()
    }
  }, [viewState])

  const ProductsList = useMemo(() => viewState.domainResult?.productList ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<ProductsColumns>>({
    column: ProductsColumns.PRODUCT_LIST,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: ProductsColumns.PRODUCT_LIST,
      label: t("field.label.products"),
      width: "10%",
    },
    {
      column: ProductsColumns.SERVICE_COMPONENT,
      label: t("field.label.serviceComponents"),
      width: "90%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ProductsColumns.PRODUCT_LIST:
        return (a: ProductItem, b: ProductItem) => ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
      case ProductsColumns.SERVICE_COMPONENT:
        return (a: ProductItem, b: ProductItem) => ORDERED_STRING_COMPARATOR(a.name, b.name, orderBy.direction)
    }
  }

  return (
    <>
      {showDeleteAlert && <SuccessAlert message={t("delete.alert.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        >
          <SmallPaddedBox>
            <PrimaryPlusButton onClick={navigateToCreateProduct} />
          </SmallPaddedBox>
        </PageHeaderFilterBox>
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ProductsColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert colSpan={2} retry={() => getProducts()} message={viewState.domainError.message} />
            )}
            <TableRowView<ProductItem>
              colSpan={2}
              rows={ProductsList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(Product) => (
                <TableRowClickable<ProductItem>
                  key={Product.id}
                  rowData={Product}
                  rowClick={(Product) => navigateToProduct(Product.id)}
                >
                  <TableCell align="left">{Product.name}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      {Product.serviceComponents.map((serviceComponent) => (
                        <Chip
                          label={serviceComponent.name}
                          color="secondary"
                          key={serviceComponent.id}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={ProductsList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
