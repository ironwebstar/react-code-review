import { Dialog, Typography, DialogContent, DialogActions } from "@mui/material"
import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { validateContractsReplace } from "./ContractsReplaceForm.Validation"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { ContractProduct } from "../../../domain/contracts/Contracts.Models"
import { FormSubtitle } from "../../../uikit/form/FormView"
import { CreateIcon, ProductIcon } from "../../../uikit/Shared.Icon"

interface ContractUpdateFormProps {
  currentStartDate: number
  currentEndDate: number
  currentProductId: string
  availableProducts: ContractProduct[]
  onOpen: boolean
  onClose: () => void
  onConfirm: (currentContractEndDate: number, selectedProductId: string) => void
}

export const ContractsReplaceForm = (props: ContractUpdateFormProps) => {
  const { t } = useTranslation("contracts")
  const { onOpen, onClose, onConfirm, currentStartDate, currentEndDate, currentProductId, availableProducts } = props
  return (
    <Dialog open={onOpen} onClose={onClose} fullWidth maxWidth="md">
      <SmallPaddedBox>
        <Typography variant="h4">{t("detail.replace-contract")}</Typography>
      </SmallPaddedBox>
      <Formik
        initialValues={{
          currentContractEndDate: currentEndDate < 0 ? currentStartDate : currentEndDate,
          selectedProductId: currentProductId,
        }}
        onSubmit={(values) => onConfirm(values.currentContractEndDate, values.selectedProductId)}
      >
        {({ values, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormRowColumn>
                  <FormRowCell>
                    <SingleLineDatePicker
                      required
                      name="currentContractEndDate"
                      label={t("detail.replace.form.field.currentContractEndDate")}
                      value={values.currentContractEndDate}
                      helperText={validateContractsReplace.currentContractEndDate(
                        values.currentContractEndDate,
                        touched.currentContractEndDate,
                        t,
                      )}
                      onChange={(value) => setFieldValue("currentContractEndDate", value)}
                      onBlur={handleBlur}
                      minDate={new Date(currentStartDate)}
                    />
                  </FormRowCell>
                </FormRowColumn>
                <FormSubtitle icon={<ProductIcon />} label={t("detail.replace.form.chooseNewProduct")} />
                <FormRowColumn>
                  <FormRowCell>
                    <SelectPicker
                      required
                      name="selectedProductId"
                      type="text"
                      label={t("detail.replace.form.product")}
                      emptyValue="None"
                      value={values.selectedProductId}
                      items={availableProducts.map((product) => ({
                        label: product.name,
                        value: product.id,
                      }))}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
              </FormView>
            </DialogContent>
            <DialogActions>
              <SecondaryButton label={t("shared:button.abort")} onClick={onClose} />
              <PrimaryButton startIcon={<CreateIcon />} label={t("detail.replace.form.cta")} type="submit" />
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}
