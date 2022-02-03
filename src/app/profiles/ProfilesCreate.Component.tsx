import { RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { useTranslation } from "react-i18next"
import { PaperBox } from "../../uikit/page/PaperBox"
import { Form, Formik, FormikProps } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ErrorAlert, InfoAlert, SuccessAlertLink } from "../../uikit/Shared.Alert"
import { FormActions, FormMode } from "../../uikit/form/FormView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { ProfilesCreateState } from "./ProfilesCreate.Reducer"
import { ProfilesForm } from "./form/ProfilesForm"
import { draftProfile, ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { validateProfile } from "./form/ProfilesForm.Validation"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { mapDispatchToProps } from "./ProfilesCreate.Connect"
import { useMemo, useRef } from "react"
import { ClearForm } from "../../uikit/form/ClearForm"

interface ProfilesCreateComponentProps
  extends ProfilesCreateState,
    ReturnType<typeof mapDispatchToProps>,
    RouteComponentProps<AppRouteParams> {}

export const ProfilesCreateComponent = (props: ProfilesCreateComponentProps) => {
  const { t } = useTranslation("profiles")
  const { createProfile, createProfileViewState, navigateToProfile } = props
  const formRef = useRef<FormikProps<ProfileUpsert>>(null)
  const containsActiveViewState = useMemo(
    () =>
      !createProfileViewState.domainResult && !createProfileViewState.isLoading && !createProfileViewState.domainError,
    [createProfileViewState],
  )
  return (
    <>
      {createProfileViewState.domainResult && (
        <SuccessAlertLink
          message={t("create.alert.success")}
          onClick={() => navigateToProfile(createProfileViewState.domainResult ?? "")}
        />
      )}
      {containsActiveViewState && (
        <InfoAlert title={t("form.action.create.info.title")} message={t("form.action.create.info.message")} />
      )}
      {createProfileViewState.domainError && (
        <ErrorAlert scrollOnDisplay message={createProfileViewState.domainError.message} />
      )}
      <>
        <ClearForm<ProfileUpsert> viewState={createProfileViewState} formRef={formRef} />
        <Formik<ProfileUpsert>
          initialValues={draftProfile}
          onSubmit={(values) => createProfile(values)}
          validate={(values) => validateProfile(values, t, VALIDATION_DEPS)}
          innerRef={formRef}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <PaperBox>
                <ProfilesForm
                  mode={FormMode.CREATE}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </PaperBox>
              <DividerBox />
              <FormActions>
                <PrimaryButtonLoading
                  disabled={!isValid || !dirty}
                  label={t("form.action.cta")}
                  type="submit"
                  startIcon={<CreateIcon />}
                  isLoading={createProfileViewState.isLoading}
                />
              </FormActions>
            </Form>
          )}
        </Formik>
      </>
    </>
  )
}
