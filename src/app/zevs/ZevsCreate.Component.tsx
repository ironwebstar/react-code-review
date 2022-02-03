import { Formik, FormikProps } from "formik"
import { useTranslation } from "react-i18next"
import { emptyZevCreate, ZevsUpsert } from "../../domain/zevs/ZevsUpsert.Model"
import { FormActions } from "../../uikit/form/FormView"
import { ZevsCreateState } from "./ZevsCreate.Reducer"
import { ZevForm, ZevFormMode } from "./form/ZevsForm"
import { ErrorAlert, SuccessAlertLink } from "../../uikit/Shared.Alert"
import { validateCreateZev } from "./form/ZevsForm.Validation"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { mapDispatchToProps } from "./ZevsCreate.Connect"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { coerce } from "../Shared.View"
import { useEffect, useRef } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ClearForm } from "../../uikit/form/ClearForm"

interface ZevsCreateComponentProps
  extends ZevsCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ZevsCreateComponent = (props: ZevsCreateComponentProps) => {
  const { t } = useTranslation("zevs")
  const { viewState, createZev, profilePrefillViewState, getZevProfilePrefill, match, navigateToZev } = props
  const formRef = useRef<FormikProps<ZevsUpsert>>(null)
  useEffect(() => {
    if (firstViewState(profilePrefillViewState)) {
      getZevProfilePrefill(match.params.profileId)
    }
  }, [profilePrefillViewState])

  if (profilePrefillViewState.domainError)
    return (
      <ErrorAlert
        retry={() => getZevProfilePrefill(match.params.profileId)}
        message={profilePrefillViewState.domainError?.message}
      />
    )
  return (
    <>
      {viewState.domainResult && (
        <SuccessAlertLink
          message={t("create.form.alert.success")}
          onClick={() => navigateToZev(viewState.domainResult ?? "")}
        />
      )}
      <ClearForm<ZevsUpsert> viewState={viewState} formRef={formRef} />
      {coerce(profilePrefillViewState.domainResult, (profilePrefill) => (
        <Formik
          validateOnBlur
          initialValues={emptyZevCreate(profilePrefill, match.params.profileId)}
          onSubmit={(values) => createZev(values)}
          validate={(values) => validateCreateZev(values, VALIDATION_DEPS, t)}
          innerRef={formRef}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
            <form onSubmit={handleSubmit}>
              {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
              <ZevForm
                mode={ZevFormMode.CREATE}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <FormActions>
                <PrimaryButtonLoading
                  startIcon={<CreateIcon />}
                  isLoading={viewState.isLoading}
                  label={t("create.form.action.cta")}
                  type="submit"
                  disabled={!isValid || !dirty}
                />
              </FormActions>
            </form>
          )}
        </Formik>
      ))}
    </>
  )
}
