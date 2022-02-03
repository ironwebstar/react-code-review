import { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { RouteComponentProps, Redirect } from "react-router-dom"
import { ProfilesUpdateState } from "./ProfilesUpdate.Reducer"
import { mapDispatchToProps } from "./ProfilesUpdate.Connect"
import { AppRouteParams } from "../App.Routes"
import { coerce } from "../Shared.View"
import { useTranslation } from "react-i18next"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { PaperBox } from "../../uikit/page/PaperBox"
import { Form, Formik } from "formik"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ProfilesForm } from "./form/ProfilesForm"
import { validateProfile } from "./form/ProfilesForm.Validation"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { FormMode } from "../../uikit/form/FormView"

interface ProfilesUpdateComponentProps
  extends ProfilesUpdateState,
    ReturnType<typeof mapDispatchToProps>,
    RouteComponentProps<AppRouteParams> {}

export const ProfilesUpdateComponent = (props: ProfilesUpdateComponentProps) => {
  const { t } = useTranslation("profiles")
  const { getProfileViewState, getProfileUpdateById, updateProfileViewState, updateProfile, match, navigateToProfile } =
    props
  useEffect(() => {
    if (firstViewState(getProfileViewState)) {
      getProfileUpdateById(match.params.profileId)
    }
  }, [getProfileViewState])
  if (getProfileViewState.isLoading) return <ProgressIndicator />
  if (getProfileViewState.domainError) return <ErrorAlert message={getProfileViewState.domainError.message} />
  if (updateProfileViewState.domainResult) return <Redirect to={`/profiles/${match.params.profileId}`} />
  return (
    <>
      {coerce(getProfileViewState.domainResult, (profileUpdate) => (
        <>
          <Formik<ProfileUpsert>
            initialValues={profileUpdate}
            onSubmit={(values) => updateProfile(match.params.profileId, values)}
            validate={(values) => validateProfile(values, t, VALIDATION_DEPS)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, resetForm, dirty }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  {updateProfileViewState.domainError && (
                    <ErrorAlert message={updateProfileViewState.domainError.message} />
                  )}
                  <PaperBox>
                    <ProfilesForm
                      mode={FormMode.UPDATE}
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </PaperBox>
                  <DividerBox />
                  <FormUpdateActionsView
                    buttonCtaLabel={t("form.cta.save-profile")}
                    isValid={isValid}
                    dirty={dirty}
                    isLoading={updateProfileViewState.isLoading}
                    navigateBack={() => navigateToProfile(match.params.profileId)}
                    resetForm={resetForm}
                  />
                </Form>
              </>
            )}
          </Formik>
        </>
      ))}
    </>
  )
}
