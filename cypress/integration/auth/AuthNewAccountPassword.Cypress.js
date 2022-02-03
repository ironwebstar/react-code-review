describe("Auth new account password", () => {
  it("successfully set a new account password", () => {
    // given
    cy.intercept("PUT", "/api/admin/v1/session/help/new-account-password?token=token", {
      statusCode: 204,
    })

    // when
    cy.visit("/session/help/new-account-password?token=token")

    // then
    cy.get("#new-account-password-title").contains("Passwort setzen")
    cy.get("#new-account-password-subtitle").contains(
      "Füllen Sie bitte die untenstehenden Felder aus um das Passwort ihres Benutzerkontos zu setzen. " +
        "Bitte beachten Sie, dass das Passwort min. 8 Zeichen lang, eine Zahl, " +
        "ein Sonderzeichen sowie Gross- und Kleinbuchstaben enthalten muss.",
    )

    cy.get("#text-field-label-password").contains("Passwort")
    cy.get("#text-field-password").should("be.visible")
    cy.get("#text-field-label-confirmPassword").contains("Passwort wiederholen")
    cy.get("#text-field-confirmPassword").should("be.visible")
    cy.get("#new-account-password-cta").contains("Passwort setzen")

    cy.get("#text-field-password").type("Password123$")
    cy.get("#text-field-confirmPassword").type("Password123$")

    // and when
    cy.get("#new-account-password-cta").click()

    // and then
    cy.get("#login-title").contains("Anmelden")
  })

  it("new account password failed", () => {
    // given
    cy.intercept("PUT", "/api/admin/v1/session/help/new-account-password?token=token", {
      statusCode: 401,
      fixture: "auth/new-account-password_401.json",
    })

    // when
    cy.visit("/session/help/new-account-password?token=token")

    // then
    cy.get("#new-account-password-title").contains("Passwort setzen")

    cy.get("#text-field-password").should("be.visible")
    cy.get("#text-field-password").type("Password123$")
    cy.get("#text-field-confirmPassword").should("be.visible")
    cy.get("#text-field-confirmPassword").type("Password123$")

    // and when
    cy.get("#new-account-password-cta").click()

    // and then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen :(")

    // and given
    cy.intercept("PUT", "/api/admin/v1/session/help/new-account-password?token=token", {
      statusCode: 204,
    })

    // and when
    cy.get("#new-account-password-cta").click()

    // and then
    cy.get("#login-title").contains("Anmelden")
  })
})
