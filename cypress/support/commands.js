/* https://on.cypress.io/custom-commands */
Cypress.Commands.add("stubCookies", () => {
  cy.setCookie("jwttoken_ckw", "cypress-jwt-stub")
  cy.setCookie("jwttokenrefresh_ckw", "cypress-jwt-refresh-stub")
})
