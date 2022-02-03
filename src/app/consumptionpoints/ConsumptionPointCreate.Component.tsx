import { Form, Formik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Redirect } from "react-router"
import { RouteComponentProps } from "react-router-dom"
import {
  emptyConsumptionPointCreate,
  ConsumptionPointUpsert,
} from "../../domain/consumptionpoints/ConsumptionPoints.Model"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { FormActions, FormMode } from "../../uikit/form/FormView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { AppRouteParams } from "../App.Routes"
import { ConsumptionPointForm } from "./form/ConsumptionPointForm"
import { validateConsumptionPoint } from "./form/ConsumptionPointForm.Validation"
import { ConsumptionPointsCreateState } from "./ConsumptionPointCreate.Reducer"
import { consumptionPointCreateMapDispatchToProps } from "./ConsumptionPointCreate.Connect"
import { firstViewState } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { DividerBox } from "../../uikit/box/DividerBox"

interface ConsumptionPointsCreateComponentProps
  extends ConsumptionPointsCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof consumptionPointCreateMapDispatchToProps> {}

export const ConsumptionPointCreateComponent = (props: ConsumptionPointsCreateComponentProps) => {
  const { t } = useTranslation("consumptionpoints")
  const { createViewState, formOptionsViewState, createConsumptionPoint, getConsumptionPointFormOptions, match } = props

  useEffect(() => {
    if (firstViewState(formOptionsViewState)) {
      getConsumptionPointFormOptions(match.params.buildingId)
    }
  }, [formOptionsViewState])

  if (createViewState.domainResult)
    return <Redirect to={`/buildings/${match.params.buildingId}/consumptionpoints/${createViewState.domainResult}`} />

  return (
    <>
      {coerce(formOptionsViewState.domainResult, (pricePackageOptions) => (
        <Formik<ConsumptionPointUpsert>
          validateOnBlur
          initialValues={emptyConsumptionPointCreate}
          onSubmit={(values) => createConsumptionPoint(match.params.buildingId, values)}
          validate={(values) => validateConsumptionPoint(values, pricePackageOptions, t)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid }) => (
            <Form onSubmit={handleSubmit}>
              {createViewState.domainError && <ErrorAlert message={createViewState.domainError.message} />}
              <PaperBox>
                <ConsumptionPointForm
                  mode={FormMode.CREATE}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  pricePackageOptions={pricePackageOptions}
                />
              </PaperBox>
              <DividerBox />
              <FormActions>
                <PrimaryButtonLoading
                  isLoading={createViewState.isLoading}
                  label={t("form.action.cta")}
                  type="submit"
                  disabled={!isValid}
                />
              </FormActions>
            </Form>
          )}
        </Formik>
      ))}
    </>
  )
}
