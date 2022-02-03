import { useTranslation } from "react-i18next"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { ServiceComponentsUpdateState } from "./ServiceComponentsUpdate.Reducer"
import { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { Form, Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormRowCell, FormView } from "../../uikit/form/FormView"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { validateServiceComponent } from "./ServiceComponentsUpdate.Validation"
import { Skeleton } from "@mui/material"
import { coerce } from "../Shared.View"
import { validationError } from "../Shared.Validation"
import { mapDispatchToProps } from "./ServiceComponentsUpdate.Connect"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"

interface ServiceComponentsUpdateComponentProps
  extends ServiceComponentsUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export interface ServiceComponentsUpdateValues {
  name: string
}

export const ServiceComponentsUpdateComponent = (props: ServiceComponentsUpdateComponentProps) => {
  const { t } = useTranslation("service-components")
  const {
    getViewState,
    updateViewState,
    getServiceComponentById,
    updateServiceComponent,
    match,
    navigateToServiceComponent,
  } = props

  useEffect(() => {
    if (firstViewState(getViewState)) {
      getServiceComponentById(match.params.serviceComponentId)
    }
  }, [getViewState, match])

  if (getViewState.domainError)
    return (
      <ErrorAlert
        retry={() => getServiceComponentById(match.params.serviceComponentId)}
        message={getViewState.domainError.message}
      />
    )
  if (updateViewState.domainResult) return <Redirect to={`/service-components/${match.params.serviceComponentId}`} />
  return (
    <>
      {getViewState.isLoading && <Skeleton />}
      {coerce(getViewState.domainResult, (serviceComponent) => (
        <Formik<ServiceComponentsUpdateValues>
          initialValues={{
            name: serviceComponent.name,
          }}
          onSubmit={(values) => updateServiceComponent(match.params.serviceComponentId, values.name)}
          validate={(values) => validateServiceComponent(values, t)}
        >
          {({ errors, values, touched, handleChange, handleBlur, handleSubmit, isValid, dirty, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
              <PaperBox>
                <FormView>
                  <FormRowCell>
                    <SingleLineTextField
                      id="name"
                      name="name"
                      type="text"
                      label={t("form.field.name")}
                      helperText={validationError(errors.name, touched.name)}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormView>
              </PaperBox>
              <DividerBox />
              <FormUpdateActionsView
                buttonCtaLabel={t("form.action.cta")}
                isValid={isValid}
                dirty={dirty}
                isLoading={updateViewState.isLoading}
                navigateBack={() => navigateToServiceComponent(match.params.serviceComponentId)}
                resetForm={resetForm}
              />
            </Form>
          )}
        </Formik>
      ))}
    </>
  )
}
