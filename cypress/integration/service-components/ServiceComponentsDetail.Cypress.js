describe("Service component detail", () => {
  it("contains the details of a service component, with an option to edit", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      fixture: "service-components/servicecomponents_detail_200.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/service-components/84321bff-b580-4e4c-9608-fafa8e218dc3")

    // then
    cy.get("#primary-edit-button").should("be.visible")

    cy.get("#data-item-box-title-service-component").contains("SERVICEKOMPONENTE")
    cy.get("#data-item-box-value-service-component").contains("Collection")
  })

  it("displays an error message with the option to retry when GET detail fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      statusCode: 400,
      fixture: "shared/generic_400.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/service-components/84321bff-b580-4e4c-9608-fafa8e218dc3")

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("GET", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      fixture: "service-components/servicecomponents_detail_200.json",
    })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#data-item-box-title-service-component").contains("SERVICEKOMPONENTE")
    cy.get("#data-item-box-value-service-component").contains("Collection")
  })
})
