describe("Auth forgotten password", () => {
  it("successfully requests a forgotten password email", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/help/forgot-password?email=sam%40ckw.ch", {
      statusCode: 204,
    })

    // when
    cy.visit("/reset-password")

    // then
    cy.get("#forgotten-password-title").contains("Passwort Zurücksetzen")
    cy.get("#forgotten-password-subtitle").contains(
      "Um Ihr Passwort zurückzusetzen, geben Sie bitte Ihren Benutzernamen an. " +
        "Falls ein Benutzerkonto existiert, werden wir Ihnen eine E-mail mit weiteren Instruktionen senden",
    )

    cy.get("#text-field-emailAddress").should("be.visible")
    cy.get("#forgotten-password-cta").should("be.visible")

    cy.get("#text-field-emailAddress").type("sam@ckw.ch")

    // and when
    cy.get("#forgotten-password-cta").click()

    // and then
    cy.get("#login-title").contains("Anmelden")
  })

  it("forgotten password failed", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/help/forgot-password?email=sam%40ckw.ch", {
      statusCode: 404,
      fixture: "auth/forgotten-password_404.json",
    })

    // when
    cy.visit("/reset-password")

    // then
    cy.get("#text-field-label-emailAddress").contains("E-Mail")
    cy.get("#text-field-emailAddress").should("be.visible")
    cy.get("#forgotten-password-cta").contains("Passwort zurücksetzen")

    cy.get("#text-field-emailAddress").type("sam@ckw.ch")

    // and when
    cy.get("#forgotten-password-cta").click()

    // and then
    cy.get("#app-alert-error").contains("Das gewünschte Objekt konnte nicht gefunden werden.")

    // and given
    cy.intercept("POST", "/api/admin/v1/session/help/forgot-password?email=sam%40ckw.ch", {
      statusCode: 204,
    })

    // and when
    cy.get("#forgotten-password-cta").click()

    // and then
    cy.get("#login-title").contains("Anmelden")
  })
})
