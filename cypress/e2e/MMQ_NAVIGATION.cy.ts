describe('navigate from homepage to MMQ', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('a[href*="/materias/FEMEC"]').click()
    cy.get('a[href*="/materias/FEMEC/MMQ"]').click()
  })
})