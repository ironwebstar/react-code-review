import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { PaperBox } from "../../uikit/page/PaperBox"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { SettingsChangePasswordState } from "./SettingsChangePassword.Reducer"
import { Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { FormView, FormRowCell, FormActions } from "../../uikit/form/FormView"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { validateChangePassword } from "./SettingsChangePassword.Validation"
import { validationError, VALIDATION_DEPS } from "../Shared.Validation"
import { mapDispatchToProps } from "./SettingsChangePassword.Connect"

interface SettingsChangePasswordComponentProps
  extends SettingsChangePasswordState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export interface SettingsChangePasswordValues {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export const SettingsChangePasswordComponent = (props: SettingsChangePasswordComponentProps) => {
  const { t } = useTranslation("settings")
  const { viewState, changePassword } = props
  return (
    <>
      {viewState.domainResult && <SuccessAlert message={t("form.alert.success")} />}
      {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
      <PaperBox>
        <Formik<SettingsChangePasswordValues>
          validateOnBlur
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={(values) => changePassword(values.currentPassword, values.newPassword)}
          validate={(values) => validateChangePassword(values, VALIDATION_DEPS, t)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit}>
              <FormView>
                <FormRowCell>
                  <SingleLineTextField
                    required
                    name="currentPassword"
                    type="password"
                    label={t("form.field.current-password")}
                    helperText={errors.currentPassword}
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormRowCell>
                <FormRowCell>
                  <SingleLineTextField
                    required
                    name="newPassword"
                    type="password"
                    label={t("form.field.new-password")}
                    helperText={validationError(errors.newPassword, touched.newPassword)}
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormRowCell>
                <FormRowCell>
                  <SingleLineTextField
                    required
                    name="confirmNewPassword"
                    type="password"
                    label={t("form.field.new-password-confirm")}
                    helperText={validationError(errors.confirmNewPassword, touched.confirmNewPassword)}
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormRowCell>
              </FormView>
              <DividerBox />
              <FormActions>
                <PrimaryButtonLoading
                  disabled={!isValid}
                  label={t("form.action.cta")}
                  type="submit"
                  isLoading={viewState.isLoading}
                />
              </FormActions>
            </form>
          )}
        </Formik>
      </PaperBox>
    </>
  )
}
