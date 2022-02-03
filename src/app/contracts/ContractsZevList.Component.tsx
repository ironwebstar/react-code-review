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
import { ContractsZevListState } from "./ContractsZevList.Reducer"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { ContractZevListItem } from "../../domain/contracts/Contracts.Models"
import { mapDispatchToProps } from "./ContractsZevList.Connect"
import { Box } from "@mui/material"
import { SpaceBetweenMiddleBox } from "../../uikit/box/AlignmentBox"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"

enum ContractsZevColumns {
  STATUS_TYPE = "STATUS_TYPE",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
  PRODUCT = "PRODUCT",
  CONTRAT_NUMBER = "CONTRAT_NUMBER",
}

interface ContractsZevListComponentProps extends ContractsZevListState, ReturnType<typeof mapDispatchToProps> {
  zevId: string
  readyForInitialContract: boolean
}

export const ContractsZevListComponent = (props: ContractsZevListComponentProps) => {
  const { t } = useTranslation("contracts")

  const { viewState, getZevContracts, navigateToContract, zevId, navigateToCreateContract, readyForInitialContract } =
    props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevContracts(zevId)
    }
  }, [viewState])

  const contractList = useMemo(() => viewState.domainResult?.contracts ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<ContractsZevColumns>>({
    column: ContractsZevColumns.PRODUCT,
    direction: "asc",
  })

  const tableHeaders = [
    {
      column: ContractsZevColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
      orderable: false,
    },
    {
      column: ContractsZevColumns.START_DATE,
      label: t("field.label.start-date"),
      width: "30%",
      orderable: false,
    },
    {
      column: ContractsZevColumns.END_DATE,
      label: t("field.label.end-date"),
      width: "30%",
      orderable: false,
    },
    {
      column: ContractsZevColumns.PRODUCT,
      label: t("field.label.product"),
      width: "30%",
      orderable: false,
    },
    {
      column: ContractsZevColumns.CONTRAT_NUMBER,
      label: t("list.label.contract-number"),
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
          {readyForInitialContract && <PrimaryPlusButton onClick={() => navigateToCreateContract(zevId)} />}
        </SmallPaddedBox>
      </SpaceBetweenMiddleBox>
      <TableContainer>
        <TableFixed>
          <TableHeaderView<ContractsZevColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && <TableRowErrorAlert colSpan={5} message={viewState.domainError.message} />}
          <TableRowView<ContractZevListItem>
            colSpan={5}
            rows={contractList}
            pageRowSlice={{
              start: 0,
              end: DEFAULT_ROWS_PER_PAGE,
            }}
            comparator={() => (a: ContractZevListItem, b: ContractZevListItem) =>
              ORDERED_STRING_COMPARATOR(a.productName, b.productName, orderBy.direction)}
            render={(contractItem) => (
              <TableRowClickable<ContractZevListItem>
                key={contractItem.id}
                rowData={contractItem}
                rowClick={(contractItem) => navigateToContract(contractItem.id)}
              >
                <TableCell align="left">
                  <StatusView statusType={contractItem.statusType} />
                </TableCell>
                <TableCell align="left">{contractItem.startDate}</TableCell>
                <TableCell align="left">{contractItem.endDate}</TableCell>
                <TableCell align="left">{contractItem.productName}</TableCell>
                <TableCell align="left">{contractItem.contractNumber}</TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
      </TableContainer>
    </PaperBox>
  )
}
