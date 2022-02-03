describe("Service component update", () => {
  it("update a service component, with an option to edit", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      fixture: "service-components/servicecomponents_detail_200.json",
    })
    cy.intercept("PUT", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      statusCode: 204,
    })
    cy.stubCookies()

    // when
    cy.visit("/service-components/84321bff-b580-4e4c-9608-fafa8e218dc3/update")

    // then
    cy.get("#text-field-label-name").contains("Servicekomponente")
    cy.get("#text-field-name").should("have.value", "Collection")

    cy.get("#form-abort").should("be.visible")
    cy.get("#form-reset").should("be.visible")
    cy.get("#form-cta").should("be.visible")

    cy.get("#text-field-name").type("UpdateCollection")

    cy.get("#form-cta").click()

    // and then
    cy.get("#app-alert-success").contains("Die Änderungen am Service Komponente wurden erfolgreich gespeichert")
    cy.get("#data-item-box-title-service-component").contains("SERVICEKOMPONENTE")
    cy.get("#data-item-box-value-service-component").contains("Collection")
  })
})
