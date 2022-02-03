describe("A list of profiles", () => {
  it("contains a list of items that can be sorted and filtered", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      fixture: "profiles/profiles_list_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/profiles/f3246369-48be-4ab2-9a61-4f77aedbaec0/unblock", { statusCode: 204 })
    cy.intercept("PUT", "/api/admin/v1/profiles/80ed5cdf-c762-45fb-ac52-baa4ff58c4b3/block", { statusCode: 204 })
    cy.stubCookies()

    // when
    cy.visit("/profiles")

    // then
    cy.get("#list-title").contains("PROFILE")
    cy.get("#table-header-STATUS_TYPE").contains("Status")
    cy.get("#table-header-PROFILE_NAME").contains("Profilname")
    cy.get("#table-header-USER_NAME").contains("Benutzername")
    cy.get("#table-header-TYPE").contains("Typ")
    cy.get("#table-header-COMMAND").contains("Befehle")

    cy.get("#list-table").find("tr").eq(0).get(".row-STATUS_TYPE").contains("ERSTELLT")
    cy.get("#list-table").find("tr").eq(0).get(".row-PROFILE_NAME").contains("Frau first name 78 last name 78")
    cy.get("#list-table").find("tr").eq(0).get(".row-USER_NAME").contains("unavailable")
    cy.get("#list-table").find("tr").eq(0).get(".row-TYPE").contains("ZEV Manager")
    cy.get("#list-table")
      .find("tr")
      .eq(0)
      .find(".MuiSvgIcon-colorWarning")
      .should("have.attr", "data-testid", "PersonAddDisabledIcon")

    cy.get("#list-table").find("tr").eq(1).get(".row-STATUS_TYPE").contains("ERSTELLT")
    cy.get("#list-table").find("tr").eq(1).get(".row-PROFILE_NAME").contains("Herr UP CKW")
    cy.get("#list-table").find("tr").eq(1).get(".row-USER_NAME").contains("unavailable")
    cy.get("#list-table").find("tr").eq(1).get(".row-TYPE").contains("Administrator")
    cy.get("#list-table")
      .find("tr")
      .eq(1)
      .find(".MuiSvgIcon-colorSecondary")
      .should("have.attr", "data-testid", "DoneIcon")

    cy.get("#list-table").find("tr").eq(2).get(".row-STATUS_TYPE").contains("ERSTELLT")
    cy.get("#list-table").find("tr").eq(2).get(".row-PROFILE_NAME").contains("Herr X Blocked")
    cy.get("#list-table").find("tr").eq(2).get(".row-USER_NAME").contains("block@blocked.com")
    cy.get("#list-table").find("tr").eq(2).get(".row-TYPE").contains("Administrator")
    cy.get("#list-table")
      .find("tr")
      .eq(2)
      .find(".MuiSvgIcon-colorError")
      .should("have.attr", "data-testid", "ClearIcon")

    // and when
    cy.get("#list-table")
      .find("tr")
      .eq(1)
      .find(".MuiSvgIcon-colorSecondary")
      .should("have.attr", "data-testid", "DoneIcon")
      .click({ force: true })

    cy.get("#app-dialog-cta").click()

    // and then
    cy.get("#list-table")
      .find("tr")
      .eq(1)
      .find(".MuiSvgIcon-colorError")
      .should("have.attr", "data-testid", "ClearIcon")

    // and when
    cy.get("#list-table")
      .find("tr")
      .eq(2)
      .find(".MuiSvgIcon-colorError")
      .should("have.attr", "data-testid", "ClearIcon")
      .click({ force: true })

    cy.get("#app-dialog-cta").click()

    // and then
    cy.get("#list-table")
      .find("tr")
      .eq(2)
      .find(".MuiSvgIcon-colorSecondary")
      .should("have.attr", "data-testid", "DoneIcon")
  })

  it("displays an error message with the option to retry when GET list fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles")

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      fixture: "profiles/profiles_list_200.json",
    })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#list-table > tr").should(($tr) => {
      expect($tr).to.have.length(3)
    })
  })

  it("displays an error message with the option to retry when block fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      fixture: "profiles/profiles_list_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/profiles/80ed5cdf-c762-45fb-ac52-baa4ff58c4b3/block", { statusCode: 400 })
    cy.stubCookies()

    // when
    cy.visit("/profiles")

    cy.get("#list-table")
      .find("tr")
      .eq(1)
      .find(".MuiSvgIcon-colorSecondary")
      .should("have.attr", "data-testid", "DoneIcon")
      .click({ force: true })

    cy.get("#app-dialog-cta").click()

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("PUT", "/api/admin/v1/profiles/80ed5cdf-c762-45fb-ac52-baa4ff58c4b3/block", { statusCode: 204 })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#list-table")
      .find("tr")
      .eq(1)
      .find(".MuiSvgIcon-colorError")
      .should("have.attr", "data-testid", "ClearIcon")
  })

  it("displays an error message with the option to retry when unblock fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      fixture: "profiles/profiles_list_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/profiles/f3246369-48be-4ab2-9a61-4f77aedbaec0/unblock", { statusCode: 400 })
    cy.stubCookies()

    // when
    cy.visit("/profiles")

    cy.get("#list-table")
      .find("tr")
      .eq(2)
      .find(".MuiSvgIcon-colorError")
      .should("have.attr", "data-testid", "ClearIcon")
      .click({ force: true })

    cy.get("#app-dialog-cta").click()

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("PUT", "/api/admin/v1/profiles/f3246369-48be-4ab2-9a61-4f77aedbaec0/unblock", { statusCode: 204 })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#list-table")
      .find("tr")
      .eq(2)
      .find(".MuiSvgIcon-colorSecondary")
      .should("have.attr", "data-testid", "DoneIcon")
  })
})
