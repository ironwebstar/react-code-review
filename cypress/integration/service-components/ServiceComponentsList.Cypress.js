describe("A list of service components", () => {
  it("contains a list of items that can be sorted and filtered", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents", {
      fixture: "service-components/servicecomponents_list_200.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/service-components")

    // then
    cy.get("#list-title").contains("SERVICE KOMPONENTEN")
    cy.get("#table-header-SERVICE_COMPONENTS").contains("SERVICEKOMPONENTE")

    cy.get("#list-table > tr").should(($tr) => {
      expect($tr).to.have.length(4)
      expect($tr.eq(0)).to.contain("Collection")
      expect($tr.eq(1)).to.contain("Powermeter Reading")
      expect($tr.eq(2)).to.contain("ZEV Participant Billing")
      expect($tr.eq(3)).to.contain("ZEV Participant Management")
    })

    cy.get("#table-header-SERVICE_COMPONENTS").click()

    cy.get("#list-table > tr").should(($tr) => {
      expect($tr).to.have.length(4)
      expect($tr.eq(0)).to.contain("ZEV Participant Management")
      expect($tr.eq(1)).to.contain("ZEV Participant Billing")
      expect($tr.eq(2)).to.contain("Powermeter Reading")
      expect($tr.eq(3)).to.contain("Collection")
    })

    cy.get("#text-field-list-title-filter").type("ZEV Participant")

    cy.get("#list-table > tr").should(($tr) => {
      expect($tr).to.have.length(2)
      expect($tr.eq(0)).to.contain("ZEV Participant Management")
      expect($tr.eq(1)).to.contain("ZEV Participant Billing")
    })
  })

  it("displays an error message with the option to retry when GET list fails", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents", { statusCode: 400, fixture: "shared/generic_400.json" })
    cy.stubCookies()

    // when
    cy.visit("/service-components")

    // then
    cy.get("#app-alert-error").contains("Etwas ist schief gelaufen")

    // and given
    cy.intercept("GET", "/api/admin/v1/servicecomponents", {
      fixture: "service-components/servicecomponents_list_200.json",
    })

    // and when
    cy.get("#app-alert-retry").click()

    // and then
    cy.get("#list-table > tr").should(($tr) => {
      expect($tr).to.have.length(4)
    })
  })
})
