describe('navigates to the MMQ page and uses it', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('a[href*="/materias/FEMEC"]').click()
    cy.get('a[href*="/materias/FEMEC/MMQ"]').click()
    cy.get('button[cy-data="example"').click()
    cy.get('textarea[cy-data="xInputBox"').should("contain", "1; 2; 3; 4; 5; 6 somente números . , ou ; são lidos")
    cy.get('textarea[cy-data="yInputBox"').should("contain", "1; 1.5; 4; 4,5; 5.8; 7")
    cy.get('textarea[cy-data="oInputBox"').should("contain", "0.3; 0.3; 0.5; 0.2; 0.4; 0.6 clique no botão no fim da página.")
  })
})