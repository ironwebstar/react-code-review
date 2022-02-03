import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Form, Formik } from "formik"

import { ConsumptionPointUpsert } from "../../domain/consumptionpoints/ConsumptionPoints.Model"

import { PaperBox } from "../../uikit/page/PaperBox"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormMode } from "../../uikit/form/FormView"

import { firstViewState } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { AppRouteParams } from "../App.Routes"
import { ConsumptionPointUpdateState } from "./ConsumptionPointUpdate.Reducer"

import { mapDispatchToProps } from "./ConsumptionPointUpdate.Connect"
import { ConsumptionPointForm } from "./form/ConsumptionPointForm"
import { validateUpdateConsumptionPoint } from "./form/ConsumptionPointForm.Validation"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"

interface ConsumptionPointUpdateComponentProps
  extends ReturnType<typeof mapDispatchToProps>,
    ConsumptionPointUpdateState,
    RouteComponentProps<AppRouteParams> {}

export const ConsumptionPointUpdateComponent = (props: ConsumptionPointUpdateComponentProps) => {
  const { t } = useTranslation("consumptionpoints")
  const {
    getViewState,
    formOptionsViewState,
    getConsumptionPointUpdate,
    updateViewState,
    getConsumptionPointFormOptions,
    updateConsumptionPoint,
    navigateToConsumptionPoint,
    match,
  } = props
  useEffect(() => {
    if (firstViewState(getViewState)) {
      getConsumptionPointUpdate(match.params.consumptionPointId)
    }
  }, [getViewState])
  useEffect(() => {
    if (firstViewState(formOptionsViewState)) {
      getConsumptionPointFormOptions(match.params.buildingId)
    }
  }, [formOptionsViewState])
  if (getViewState.isLoading || formOptionsViewState.isLoading) return <ProgressIndicator />
  if (getViewState.domainError) return <ErrorAlert message={getViewState.domainError.message} />
  if (updateViewState.domainResult)
    return (
      <Redirect to={`/buildings/${match.params.buildingId}/consumptionpoints/${match.params.consumptionPointId}`} />
    )
  return (
    <>
      {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
      {coerce(getViewState.domainResult, (consumptionPointUpsert) => (
        <>
          {coerce(formOptionsViewState.domainResult, (pricePackageOptions) => (
            <>
              <Formik<ConsumptionPointUpsert>
                initialValues={consumptionPointUpsert}
                onSubmit={(values) => updateConsumptionPoint(match.params.consumptionPointId, values)}
                validate={(values) => validateUpdateConsumptionPoint(values, pricePackageOptions, t)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  setFieldValue,
                  dirty,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <PaperBox>
                      <ConsumptionPointForm
                        mode={FormMode.UPDATE}
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
                    <FormUpdateActionsView
                      buttonCtaLabel={t("form.action.cta")}
                      isValid={isValid}
                      dirty={dirty}
                      isLoading={updateViewState.isLoading}
                      navigateBack={() =>
                        navigateToConsumptionPoint(match.params.buildingId, match.params.consumptionPointId)
                      }
                      resetForm={resetForm}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ))}
        </>
      ))}
    </>
  )
}
