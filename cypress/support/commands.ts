/// <reference types="cypress" />

Cypress.Commands.add("getCyData", (selector: string) => {
    return cy.get(`[cy-data=${selector}]`)
})

export { }