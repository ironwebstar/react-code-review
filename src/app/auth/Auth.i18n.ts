import { I18nNamespace } from "../App.i18n"

export const AuthI18n: I18nNamespace = {
  name: "auth",
  de: {
    "login.title": "Anmelden",
    "login.label": "Geben Sie bitte Ihren Benutzernamen und Ihr Passwort an, um sich beim System anzumelden",
    "login.field.emailAddress": "Benutzername",
    "login.field.password": "Passwort",
    "login.action.cta": "Amelden",
    "login.action.forgottenPassword": "Passwort vergessen",
    "forgotten-password.title": "Passwort Zurücksetzen",
    "forgotten-password.label":
      "Um Ihr Passwort zurückzusetzen, geben Sie bitte Ihren Benutzernamen an. " +
      "Falls ein Benutzerkonto existiert, werden wir Ihnen eine E-mail mit weiteren Instruktionen senden",
    "forgotten-password.field.email": "E-Mail",
    "forgotten-password.action.cta": "Passwort zurücksetzen",
    "forgotten-password.login": "Anmelden!",
    "newAccountPassword.title": "Passwort setzen",
    "newAccountPassword.label":
      "Füllen Sie bitte die untenstehenden Felder aus um das Passwort ihres " +
      "Benutzerkontos zu setzen. Bitte beachten Sie, dass das Passwort min. 8 Zeichen lang," +
      " eine Zahl, ein Sonderzeichen sowie Gross- und Kleinbuchstaben enthalten muss.",
    "newAccountPassword.field.password": "Passwort",
    "newAccountPassword.field.confirmPassword": "Passwort wiederholen",
    "newAccountPassword.action.cta": "Passwort setzen",
    "newAccountPassword.validation.passwordMatch": "Die Passwörter müssen übereinstimmen",
  },
  en: {
    "login.title": "Login",
    "login.label": "Please enter your username and password to log into the system",
    "login.field.emailAddress": "E-mail Address",
    "login.field.password": "Password",
    "login.action.cta": "Login",
    "login.action.forgottenPassword": "Forgotten password",
    "forgotten-password.title": "Passwords must match",
    "forgotten-password.label":
      "To reset your password, please enter your username. If a user account exists, " +
      "we will send you an email with further instructions",
    "forgotten-password.field.email": "E-mail",
    "forgotten-password.action.cta": "Reset Password",
    "forgotten-password.login": "Register!",
    "newAccountPassword.title": "Set password",
    "newAccountPassword.label":
      "Please fill in the fields below to set the password for " +
      "your user account. Please note that the password must contain" +
      " at least 8 characters, a number, a special character and capital and small letters.",
    "newAccountPassword.field.password": "Password",
    "newAccountPassword.field.confirmPassword": "Repeat password",
    "newAccountPassword.action.cta": "Set password",
    "newAccountPassword.validation.passwordMatch": "The passwords must match",
  },
}
