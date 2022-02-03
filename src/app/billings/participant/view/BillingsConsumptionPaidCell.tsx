import { FormControlLabel, Checkbox, TableCell } from "@mui/material"
import { useTranslation } from "react-i18next"
import { TableActionView } from "../../../../uikit/table/TableActionView"

interface BillingsConsumptionPaidCellProps {
  billId: string
  paid: boolean
  payOrUnpaidToggle: (billId: string, paid: boolean) => void
  isLoading: boolean
}

export const BillingsConsumptionPaidCell = (props: BillingsConsumptionPaidCellProps) => {
  const { t } = useTranslation("billings-participant")
  const { billId, paid, payOrUnpaidToggle, isLoading } = props
  return (
    <TableCell align="right">
      <FormControlLabel
        onClick={(event) => {
          event.stopPropagation()
          payOrUnpaidToggle(billId, !paid)
        }}
        control={
          <TableActionView isLoading={isLoading}>
            <Checkbox
              checked={paid}
              onClick={(event) => {
                event.stopPropagation()
                payOrUnpaidToggle(billId, !paid)
              }}
            />
          </TableActionView>
        }
        label={<>{t("detail.all.consumption.list.label.paid")}</>}
      />
    </TableCell>
  )
}
