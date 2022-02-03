import { useEffect, useMemo, useState } from "react"
import { FormikHandlers, FormikHelpers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import { FormRowCell, FormRowColumn, FormView } from "../../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../../uikit/input/SingleLineDatePicker"
import { validationError } from "../../../Shared.Validation"
import {
  BillingsRecurringUpsert,
  HalfOfYear,
  BillingRecurringZevListItem,
} from "../../../../domain/billings/recurring/BillingsRecurring.Model"
import { RadioGroup, FormControlLabel, Radio, Autocomplete, Checkbox, Box, FormGroup } from "@mui/material"
import { SingleLineTextField } from "../../../../uikit/input/SingleLineTextField"
import { isEqual, isBefore, isAfter } from "date-fns"

interface BillingsRecurringFormProps {
  zevs: BillingRecurringZevListItem[]
}

export function BillingsRecurringForm(
  props: BillingsRecurringFormProps &
    Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<BillingsRecurringUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<BillingsRecurringUpsert>, "setFieldValue">,
) {
  const { t } = useTranslation("billings-recurring")
  const { zevs, handleBlur, touched, setFieldValue, values, errors } = props

  useEffect(() => {
    const [startMonth, endMonth] = values.halfOfYear === HalfOfYear.FIRST ? ["01-01", "06-30"] : ["07-01", "12-31"]
    const year = values.year.getFullYear()
    setFieldValue("startDate", new Date(`${year}-${startMonth}`))
    setFieldValue("endDate", new Date(`${year}-${endMonth}`))
  }, [values.halfOfYear, values.year])

  const filteredZevList = useMemo(
    () =>
      zevs.filter(
        (zev) =>
          beforeOrEqual(new Date(zev.zevStartDate), values.endDate) &&
          (zev.serviceEndDate === -1 || afterOrEqual(new Date(zev.serviceEndDate), values.startDate)),
      ),
    [values.startDate, values.endDate, zevs],
  )

  const [useAllZevs, setUseAllZevs] = useState(false)
  useEffect(() => {
    setFieldValue("selectedZevs", useAllZevs ? filteredZevList.map((zev) => zev.id) : [])
  }, [useAllZevs, filteredZevList, setFieldValue])

  return (
    <FormView>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineDatePicker
            name="startDate"
            label={t("form.field.startDate")}
            helperText={validationError(errors.startDate, touched.startDate)}
            value={new Date(values.year).setHours(0, 0, 0, 0)}
            onChange={(value) => {
              setFieldValue("year", new Date(value))
            }}
            onBlur={handleBlur}
            views={["year"]}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineDatePicker
            disabled
            name="endDate"
            label={t("form.field.endDate")}
            value={new Date(values.endDate).setHours(0, 0, 0, 0)}
            onChange={(value) => setFieldValue("endDate", value)}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <RadioGroup row color="secondary" name="moveOutType" value={values.halfOfYear}>
            <FormControlLabel
              value={HalfOfYear.FIRST}
              control={<Radio required onClick={() => setFieldValue("halfOfYear", HalfOfYear.FIRST)} />}
              label={`${t("form.field.firstHalfYear")}`}
            />
            <FormControlLabel
              value={HalfOfYear.SECOND}
              control={<Radio required onClick={() => setFieldValue("halfOfYear", HalfOfYear.SECOND)} />}
              label={`${t("form.field.secondHalfYear")}`}
            />
          </RadioGroup>
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <ZevsFilterView
            selectedItems={values.selectedZevs}
            label={t("form.field.selectZevs")}
            zevs={filteredZevList}
            onSelectionChanged={(selectedZevs) => setFieldValue("selectedZevs", selectedZevs)}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <Box ml={1}>
          <FormGroup>
            <FormControlLabel
              onClick={() => setUseAllZevs(!useAllZevs)}
              control={<Checkbox checked={useAllZevs} />}
              label={`${t("form.field.allZevs")}`}
            />
          </FormGroup>
        </Box>
      </FormRowColumn>
    </FormView>
  )
}

function beforeOrEqual(target: Date, comparison: Date): boolean {
  return isEqual(target, comparison) || isBefore(target, comparison)
}

function afterOrEqual(target: Date, comparison: Date): boolean {
  return isEqual(target, comparison) || isAfter(target, comparison)
}

const ZevsFilterView = (props: {
  selectedItems: string[]
  label: string
  zevs: BillingRecurringZevListItem[]
  onSelectionChanged: (values: string[]) => void
}) => {
  const { selectedItems, label, zevs, onSelectionChanged } = props
  return (
    <Autocomplete
      clearOnBlur
      multiple
      filterSelectedOptions
      value={zevs.filter((zev) => selectedItems.includes(zev.id))}
      options={zevs}
      getOptionLabel={(zev) => zev.name}
      onChange={(_, value, reason) => {
        if ((reason === "selectOption" || reason === "removeOption") && value !== null) {
          onSelectionChanged(value.map((zev) => zev.id))
        }
        if (reason === "clear") {
          onSelectionChanged([])
        }
      }}
      renderInput={(params) => <SingleLineTextField {...params} label={label} />}
    />
  )
}
