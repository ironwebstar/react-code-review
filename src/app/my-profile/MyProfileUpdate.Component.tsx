import { useTranslation } from "react-i18next"
import { useEffect, useMemo } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { FormMode } from "../../uikit/form/FormView"
import { DividerBox } from "../../uikit/box/DividerBox"
import { MyProfileUpdateState } from "./MyProfileUpdate.Reducer"
import { mapDispatchToProps } from "./MyProfileUpdate.Connect"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { Form, Formik } from "formik"
import { ProfilesForm } from "../profiles/form/ProfilesForm"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { validateProfile } from "../profiles/form/ProfilesForm.Validation"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"

interface MyProfileUpdateComponentProps
  extends MyProfileUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const MyProfileUpdateComponent = (props: MyProfileUpdateComponentProps) => {
  const { t } = useTranslation("my-profile")
  const { getMyProfile, getMyProfileUpsertViewState, updateMyProfile, updateViewState, match, navigateToMyProfile } =
    props
  const myProfileId = useMemo(() => match.params.profileId, [match])

  useEffect(() => {
    if (firstViewState(getMyProfileUpsertViewState)) {
      getMyProfile(myProfileId)
    }
  }, [getMyProfileUpsertViewState, getMyProfile])

  if (updateViewState.domainResult) return <Redirect to="/my-profile" />
  if (getMyProfileUpsertViewState.isLoading) return <ProgressIndicator />
  if (getMyProfileUpsertViewState.domainError)
    return (
      <ErrorAlert retry={() => getMyProfile(myProfileId)} message={getMyProfileUpsertViewState.domainError.message} />
    )
  return (
    <>
      {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
      {coerce(getMyProfileUpsertViewState.domainResult, (myProfileUpdate) => (
        <>
          <Formik<ProfileUpsert>
            initialValues={myProfileUpdate}
            onSubmit={(values) => updateMyProfile(match.params.profileId, values)}
            validate={(values) => validateProfile(values, t, VALIDATION_DEPS)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty, resetForm }) => (
              <Form onSubmit={handleSubmit}>
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
                  isLoading={updateViewState.isLoading}
                  navigateBack={() => navigateToMyProfile()}
                  resetForm={resetForm}
                />
              </Form>
            )}
          </Formik>
        </>
      ))}
    </>
  )
}
