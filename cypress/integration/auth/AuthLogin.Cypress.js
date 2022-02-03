describe("Auth login", () => {
  it("successfully logged in", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { statusCode: 500 })
    cy.intercept("GET", "/api/admin/v1/zevs?page=1&limit=10000", { statusCode: 401 })
    cy.intercept("POST", "/api/admin/v1/session/authenticate", {
      fixture: "auth/authenticate_200.json",
    })

    // when
    cy.visit("/")

    // then
    cy.get("#login-title").contains("Anmelden")
    cy.get("#login-label").contains(
      "Geben Sie bitte Ihren Benutzernamen und Ihr Passwort an, um sich beim System anzumelden",
    )

    cy.get("#text-field-label-emailAddress").contains("Benutzername")
    cy.get("#text-field-emailAddress").should("be.visible")
    cy.get("#text-field-label-password").contains("Passwort")
    cy.get("#text-field-password").should("be.visible")
    cy.get("#login-cta").contains("Amelden")
    cy.get("#forgotten-password-cta").contains("Passwort vergessen")

    cy.get("#text-field-emailAddress").type("sam@ckw.ch")
    cy.get("#text-field-password").type("Password123*")

    // and given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })

    // and when
    cy.get("#login-cta").click()

    // and then
    cy.get("#list-title").contains("ZEVS")
  })

  it("login failed", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { statusCode: 500 })
    cy.intercept("GET", "/api/admin/v1/zevs?page=1&limit=10000", { statusCode: 401 })
    cy.intercept("POST", "/api/admin/v1/session/authenticate", {
      statusCode: 401,
      fixture: "auth/authenticate_401.json",
    })

    // when
    cy.visit("/")

    // then
    cy.get("#text-field-emailAddress").should("be.visible")
    cy.get("#text-field-password").should("be.visible")

    cy.get("#text-field-emailAddress").type("sam@ckw.ch")
    cy.get("#text-field-password").type("Password123*")

    // and when
    cy.get("#login-cta").click()

    // and then
    cy.get("#app-alert-error").contains("Ihr Benutzername oder Passwort ist ungültig. Bitte versuchen Sie es erneut.")

    // and given
    cy.intercept("POST", "/api/admin/v1/session/authenticate", {
      fixture: "auth/authenticate_200.json",
    })

    // and when
    cy.get("#login-cta").click()

    // and then
    cy.get("#list-title").contains("ZEVS")
  })

  it("already authenticated", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/zevs?page=1&limit=10000", { statusCode: 400 })

    // when
    cy.visit("/")

    // then
    cy.get("#list-title").contains("ZEVS")
  })

  it("visit forgotten password", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { statusCode: 500 })
    cy.intercept("GET", "/api/admin/v1/zevs?page=1&limit=10000", { statusCode: 401 })

    // when
    cy.visit("/")

    // then
    cy.get("#login-title").contains("Anmelden")

    // and when
    cy.get("#forgotten-password-cta").click()

    // and then
    cy.get("#forgotten-password-title").contains("Passwort Zurücksetzen")

    // and when
    cy.get("#forgotten-password-back-cta").click()

    // and then
    cy.get("#login-title").contains("Anmelden")
  })
})
