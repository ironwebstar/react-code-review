describe("Profile detail", () => {
  it("contains the details of a profile, with an option to edit", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    // then
    cy.get("#profile-status").contains("ERSTELLT")
    cy.get("#profile-edit-cta").should("be.visible")
    cy.get("#profile-label-title").contains("Entitled Herr")
    cy.get("#profile-label-name").contains("Samuel Kirton")
    cy.get("#data-item-box-value-street").contains("Seestrasse 81")
    cy.get("#data-item-box-value-city").contains("8002 Zürich")
    cy.get("#data-item-box-value-telephone").contains("+41 76 203 33 41")
    cy.get("#data-item-box-value-mobile").contains("+41 76 203 33 42")
    cy.get("#data-item-box-value-email").contains("sam@ckw.ch")
    cy.get("#profile-status-type").contains("AKTIV")
    cy.get("#data-item-box-value-username").contains("sam@ckw.ch")
    cy.get("#data-item-box-value-userType").contains("ZEV Manager")
  })

  it("displays an error message with the option to retry when GET detail fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#profile-status").contains("ERSTELLT")
  })

  it("navigates to create zev with the profile name prefilled in the Zev manager list", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })
    cy.intercept("GET", "/api/admin/v1/profiles?page=1&limit=10000", {
      fixture: "profiles/profiles_list_manager_200.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#create-zev-for-profile-cta").click()

    // then
    cy.get("#breadcrumb-2").contains("ZEV ERSTELLEN")
    cy.get(".MuiChip-label").contains("Entitled Herr Samuel Kirton, Seestrasse 81")
  })

  it("attempts to delete the profile with a retry, and then directs to profile list on success", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })
    cy.intercept("DELETE", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#delete-cta").click()
    cy.get("#app-dialog-cta").click()

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("DELETE", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      statusCode: 204,
    })

    // and when
    cy.get("#app-alert-retry").click()

    // then
    cy.get("#list-title").contains("PROFILE")
    cy.get("#app-alert-success").contains("Profil wurde erfolgreich gelöscht")
  })

  it("attempts to activate the profile with a retry", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_blocked_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/unblock", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#activate-cta").click()

    // then
    cy.get("#profile-status-type").contains("GESPERRT")
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("PUT", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/unblock", {
      statusCode: 204,
    })

    // and when
    cy.get("#app-alert-retry").click()

    // then
    cy.get("#profile-status-type").contains("AKTIV")
    cy.get("#app-alert-success").contains("Das Profil wurde erfolgreich aktiviert")
  })

  it("attempts to deactivate the profile with a retry", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/block", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#deactivate-cta").click()

    // then
    cy.get("#profile-status-type").contains("AKTIV")
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("PUT", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/block", {
      statusCode: 204,
    })

    // and when
    cy.get("#app-alert-retry").click()

    // then
    cy.get("#profile-status-type").contains("GESPERRT")
    cy.get("#app-alert-success").contains("Das Profil wurde erfolgreich deaktiviert")
  })

  it("attempts to reset the profile password with a retry", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_created_200.json",
    })
    cy.intercept("POST", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/reset-password", {
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#reset-password-cta").click()

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("POST", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/reset-password", {
      statusCode: 204,
    })

    // and when
    cy.get("#app-alert-retry").click()

    // then
    cy.get("#app-alert-success").contains("Das Passwort wurde erfolgreich zurückgesetzt")
  })

  it("attempts to create an admin login with a retry", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_unavailable_200.json",
    })
    cy.intercept("POST", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/login", {
      fixture: "profiles/profiles_login_400.json",
      statusCode: 400,
    })
    cy.stubCookies()

    // when
    cy.visit("/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3")

    cy.get("#create-login-cta").click()

    // then
    cy.get("#profile-status-type").contains("NICHT ERSTELLT")
    cy.get("#app-alert-error").contains("Die angegebene E-Mail ist ungültig. Bitte versuchen Sie es erneut.")

    // and given
    cy.intercept("POST", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3/login", {
      statusCode: 201,
    })
    cy.intercept("GET", "/api/admin/v1/profiles/9504655f-0ef5-4a02-928d-01d0d9855ce3", {
      fixture: "profiles/profiles_detail_blocked_200.json",
    })

    // and when
    cy.get("#app-alert-retry").click()

    // then
    cy.get("#profile-status-type").contains("GESPERRT")
  })
})
