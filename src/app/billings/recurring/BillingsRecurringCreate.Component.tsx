import { useEffect } from "react"
import { Form, Formik } from "formik"
import { useTranslation } from "react-i18next"
import { FormActions } from "../../../uikit/form/FormView"
import { firstViewState } from "../../Shared.Reducer"
import { BillingsRecurringCreateState } from "./BillingsRecurringCreate.Reducer"
import { BillingsRecurringForm } from "./form/BillingsRecurringCreateForm"
import { Redirect } from "react-router"
import { ErrorAlert } from "../../../uikit/Shared.Alert"
import { validateBillingsRecurring } from "./form/BillingsRecurringCreateForm.Validation"
import { PrimaryButtonLoading } from "../../../uikit/button/PrimaryButtonLoading"
import { RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../../App.Routes"
import { mapDispatchToProps } from "./BillingsRecurringCreate.Connect"
import { CreateIcon } from "../../../uikit/Shared.Icon"
import { emptyBillingsRecurringCreate } from "../../../domain/billings/recurring/BillingsRecurring.Model"
import { coerce } from "../../Shared.View"
import { ProgressIndicator } from "../../../uikit/progress/ProgressIndicator"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { DividerBox } from "../../../uikit/box/DividerBox"

interface BillingsRecurringCreateComponentProps
  extends BillingsRecurringCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BillingsRecurringCreateComponent = (props: BillingsRecurringCreateComponentProps) => {
  const { t } = useTranslation("billings-recurring")
  const { viewState, zevsListViewState, createBillingsRecurring, getZevs } = props
  useEffect(() => {
    if (firstViewState(zevsListViewState)) {
      getZevs()
    }
  }, [zevsListViewState, getZevs])
  if (zevsListViewState.isLoading) return <ProgressIndicator />
  if (viewState.domainResult) return <Redirect to={`/billings/recurring/details/${viewState.domainResult}`} />
  return (
    <>
      {zevsListViewState.domainError && (
        <ErrorAlert retry={() => getZevs()} message={zevsListViewState.domainError.message} />
      )}
      {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
      {coerce(zevsListViewState.domainResult, (zevsList) => (
        <PaperBox>
          <Formik
            validateOnBlur
            initialValues={emptyBillingsRecurringCreate}
            onSubmit={(values) => {
              createBillingsRecurring(values)
            }}
            validate={(values) => validateBillingsRecurring(values, t)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <BillingsRecurringForm
                  zevs={zevsList}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <DividerBox />
                <FormActions>
                  <PrimaryButtonLoading
                    startIcon={<CreateIcon />}
                    isLoading={viewState.isLoading}
                    label={t("form.action.create.cta")}
                    type="submit"
                    disabled={!isValid}
                  />
                </FormActions>
              </Form>
            )}
          </Formik>
        </PaperBox>
      ))}
    </>
  )
}
