import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { Redirect } from "react-router"
import { AuthState } from "./AuthLogin.Reducer"
import { TextButton } from "../../uikit/button/TextButton"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { validateAuth } from "./AuthLogin.Validation"
import { ImpressionHeader } from "../../uikit/typography/Header"
import { SmallPaddedBox, SmallPaddedHorizontalBox } from "../../uikit/box/PaddedBox"
import { Typography, Box } from "@mui/material"
import { FormActions } from "../../uikit/form/FormView"
import { AuthContainerView } from "./views/AuthContainerView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { validationError } from "../Shared.Validation"
import { mapDispatchToProps } from "./AuthLogin.Connect"

export interface AuthLoginComponentProps extends AuthState, ReturnType<typeof mapDispatchToProps> {}

export interface AuthLoginValues {
  emailAddress: string
  password: string
}

export const AuthLoginComponent = (props: AuthLoginComponentProps) => {
  const { t } = useTranslation("auth")
  const { viewState, login, navigateToForgottenPassword, previousPathname } = props
  if (viewState.domainResult) return <Redirect to={previousPathname ? previousPathname : "/zevs"} />
  return (
    <AuthContainerView>
      <ImpressionHeader id="login-title">{t("login.title")}</ImpressionHeader>
      <Box ml={2} mr={2} mb={2}>
        <Typography id="login-label" variant="body1">
          {t("login.label")}
        </Typography>
      </Box>
      <Formik<AuthLoginValues>
        validateOnBlur
        initialValues={{
          emailAddress: "",
          password: "",
        }}
        onSubmit={(values) => login(values.emailAddress, values.password)}
        validate={(values) => validateAuth(values, t)}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
            <SmallPaddedBox>
              <SingleLineTextField
                id="emailAddress"
                autoFocus={true}
                name="emailAddress"
                type="emailAddress"
                label={t("login.field.emailAddress")}
                helperText={validationError(errors.emailAddress, touched.emailAddress)}
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SmallPaddedBox>
            <SmallPaddedHorizontalBox>
              <SingleLineTextField
                id="password"
                name="password"
                type="password"
                label={t("login.field.password")}
                helperText={validationError(errors.password, touched.password)}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SmallPaddedHorizontalBox>
            <FormActions>
              <SmallPaddedBox>
                <PrimaryButtonLoading
                  id="login-cta"
                  disabled={!isValid}
                  isLoading={viewState.isLoading}
                  label={t("login.action.cta")}
                  type="submit"
                />
              </SmallPaddedBox>
            </FormActions>
            <SmallPaddedBox>
              <TextButton
                id="forgotten-password-cta"
                label={t("login.action.forgottenPassword")}
                onClick={navigateToForgottenPassword}
              />
            </SmallPaddedBox>
          </form>
        )}
      </Formik>
    </AuthContainerView>
  )
}
