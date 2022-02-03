import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { Redirect } from "react-router"
import { AuthState } from "./AuthLogin.Reducer"
import { TextButton } from "../../uikit/button/TextButton"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { ImpressionHeader } from "../../uikit/typography/Header"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { Typography, Box } from "@mui/material"
import { FormActions } from "../../uikit/form/FormView"
import { AuthContainerView } from "./views/AuthContainerView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { validateForgottenPassword } from "./AuthForgottenPassword.Validation"
import { validationError } from "../Shared.Validation"
import { mapDispatchToProps } from "./AuthForgottenPassword.Connect"

export interface AuthForgottenPasswordComponentProps extends AuthState, ReturnType<typeof mapDispatchToProps> {}

export interface AuthForgottenPasswordValues {
  emailAddress: string
}

export const AuthForgottenPasswordComponent = (props: AuthForgottenPasswordComponentProps) => {
  const { t } = useTranslation("auth")
  const { viewState, forgottenPassword, navigateToLogin } = props
  return (
    <AuthContainerView>
      <ImpressionHeader id="forgotten-password-title">{t("forgotten-password.title")}</ImpressionHeader>
      <Box ml={2} mr={2} mb={2}>
        <Typography id="forgotten-password-subtitle" variant="body1">
          {t("forgotten-password.label")}
        </Typography>
      </Box>
      <Formik<AuthForgottenPasswordValues>
        validateOnBlur
        initialValues={{
          emailAddress: "",
        }}
        onSubmit={(values) => forgottenPassword(values.emailAddress)}
        validate={(values) => validateForgottenPassword(values, t)}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isValid, touched }) => (
          <form onSubmit={handleSubmit}>
            {viewState.domainResult && <Redirect to="/signin" />}
            {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
            <SmallPaddedBox>
              <SingleLineTextField
                id="emailAddress"
                autoFocus={true}
                name="emailAddress"
                type="emailAddress"
                label={t("forgotten-password.field.email")}
                helperText={validationError(errors.emailAddress, touched.emailAddress)}
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SmallPaddedBox>
            <FormActions>
              <SmallPaddedBox>
                <PrimaryButtonLoading
                  id="forgotten-password-cta"
                  disabled={!isValid}
                  isLoading={viewState.isLoading}
                  label={t("forgotten-password.action.cta")}
                  type="submit"
                />
              </SmallPaddedBox>
            </FormActions>
            <SmallPaddedBox>
              <TextButton
                id="forgotten-password-back-cta"
                label={t("forgotten-password.login")}
                onClick={navigateToLogin}
              />
            </SmallPaddedBox>
          </form>
        )}
      </Formik>
    </AuthContainerView>
  )
}
