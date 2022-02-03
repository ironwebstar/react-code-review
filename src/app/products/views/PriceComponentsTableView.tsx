import { TableRowView } from "../../../uikit/table/Table.RowView"
import { IconButton, TableCell, TableContainer, TableRow } from "@mui/material"
import { BillingType, PowerMeterType, ProductPriceComponent } from "../../../domain/products/Products.Model"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { useTranslation } from "react-i18next"
import { Fragment, useState } from "react"
import { EditIcon, RemoveIcon } from "../../../uikit/Shared.Icon"
import { ViewStateMap } from "../../Shared.Reducer"
import { TableRowErrorAlert } from "../../../uikit/Shared.Alert"

enum PriceComponentColumns {
  NAME = "NAME",
  BILLING_TYPE = "BILLING_TYPE",
  PRICE_EXCLUDING_VAT = "PRICE_EXCLUDING_VAT.",
  VALID_FROM = "VALID_FROM",
  EXPIRY_DATE = "EXPIRY_DATE",
  EXTERNAL_REF_NUMBER = "EXTERNAL_REF_NUMBER",
  DELETE_COLUMN = "DELETE_COLUMN",
  EDIT_COLUMN = "EDIT_COLUMN",
}

interface PriceComponentsTableViewProps {
  priceComponents: ProductPriceComponent[]
  navigateToUpdatePriceComponent: (priceComponentId: string) => void
  deletePriceComponent: (priceComponentId: string) => void
  deletePriceComponentViewState: ViewStateMap<string, boolean>
}

export const PriceComponentsTableView = (props: PriceComponentsTableViewProps) => {
  const { t } = useTranslation("products")
  const [orderBy, setOrderBy] = useState<TableColumnSort<PriceComponentColumns>>({
    column: PriceComponentColumns.NAME,
    direction: "desc",
  })
  const headers = [
    {
      column: PriceComponentColumns.NAME,
      label: t("list.label.name"),
      width: "15%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.BILLING_TYPE,
      label: t("list.label.billing-type"),
      width: "25%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.PRICE_EXCLUDING_VAT,
      label: t("list.label.price-ex-vat"),
      width: "10%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.VALID_FROM,
      label: t("list.label.valid-from"),
      width: "10%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.EXPIRY_DATE,
      label: t("field.label.expiry-date"),
      width: "10%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.EXTERNAL_REF_NUMBER,
      label: t("list.label.ext-ref-number"),
      width: "10%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.DELETE_COLUMN,
      label: "",
      width: "5%",
      orderable: false,
    },
    {
      column: PriceComponentColumns.EDIT_COLUMN,
      label: "",
      width: "5%",
      orderable: false,
    },
  ]
  const { priceComponents, deletePriceComponent, navigateToUpdatePriceComponent, deletePriceComponentViewState } = props
  return (
    <>
      <TableContainer>
        <TableFixed>
          <TableHeaderView<PriceComponentColumns>
            headers={headers}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          <TableRowView<ProductPriceComponent>
            colSpan={9}
            rows={priceComponents}
            pageRowSlice={{
              start: 0,
              end: 100,
            }}
            render={(priceComponent) => (
              <Fragment key={priceComponent.id}>
                {deletePriceComponentViewState.domainError.get(priceComponent.id) && (
                  <TableRowErrorAlert
                    colSpan={9}
                    message={deletePriceComponentViewState.domainError.get(priceComponent.id)?.message ?? ""}
                  />
                )}
                <TableRow key={priceComponent.id}>
                  <TableCell align="left">{priceComponent.name}</TableCell>
                  <TableCell align="left">
                    <BillingTypeText
                      billingType={priceComponent.billingType}
                      powermeterType={priceComponent.powermeterType}
                    />
                  </TableCell>
                  <TableCell align="left">{priceComponent.priceWithoutVat}</TableCell>
                  <TableCell align="left">{priceComponent.validFrom}</TableCell>
                  <TableCell align="left">{priceComponent.validUntil}</TableCell>
                  <TableCell align="left">{priceComponent.externalReferenceNumber}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation()
                        deletePriceComponent(priceComponent.id)
                      }}
                    >
                      <RemoveIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation()
                        navigateToUpdatePriceComponent(priceComponent.id)
                      }}
                    >
                      <EditIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </Fragment>
            )}
          />
        </TableFixed>
      </TableContainer>
    </>
  )
}

const BillingTypeText = (props: { billingType: BillingType; powermeterType?: PowerMeterType }) => {
  const { t } = useTranslation("products")
  const { billingType, powermeterType } = props
  if (!powermeterType) return <>{t(`billingType.${billingType}`)}</>
  return (
    <>
      {t(`billingType.${billingType}`)} ({t(`powermeterType.${powermeterType}`)})
    </>
  )
}
