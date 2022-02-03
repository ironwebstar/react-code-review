describe("Service component breadcrumb", () => {
  it("navigate between service component screens", () => {
    // given
    cy.intercept("POST", "/api/admin/v1/session/refresh", { fixture: "auth/session_refresh_200.json" })
    cy.intercept("GET", "/api/admin/v1/servicecomponents", {
      fixture: "service-components/servicecomponents_list_200.json",
    })
    cy.intercept("GET", "/api/admin/v1/servicecomponents/84321bff-b580-4e4c-9608-fafa8e218dc3", {
      fixture: "service-components/servicecomponents_detail_200.json",
    })
    cy.stubCookies()

    // when
    cy.visit("/service-components/")

    // then
    cy.get("#breadcrumb-0").contains("SERVICE KOMPONENTEN").should("have.class", "Mui-disabled")

    // and when
    cy.get("#list-table > tr").should(($tr) => {
      $tr.eq(0).click()
    })

    // and then
    cy.get("#breadcrumb-0").contains("SERVICE KOMPONENTEN").should("not.have.class", "Mui-disabled")
    cy.get("#breadcrumb-1").contains("SERVICE KOMPONENTEN DETAIL").should("have.class", "Mui-disabled")

    // and when
    cy.get("#primary-edit-button").click()

    // and then
    cy.get("#breadcrumb-0").contains("SERVICE KOMPONENTEN").should("not.have.class", "Mui-disabled")
    cy.get("#breadcrumb-1").contains("SERVICE KOMPONENTEN DETAIL").should("not.have.class", "Mui-disabled")
    cy.get("#breadcrumb-2").contains("SERVICE KOMPONENTEN UPDATE").should("have.class", "Mui-disabled")

    // and when
    cy.get("#breadcrumb-1").click()

    // and then
    cy.get("#primary-edit-button").click() // details screen

    // and when
    cy.get("#breadcrumb-0").click()

    // and then
    cy.get("#list-title").contains("SERVICE KOMPONENTEN")
  })
})
