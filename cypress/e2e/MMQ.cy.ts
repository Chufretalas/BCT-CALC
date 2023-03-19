describe('navigates to the MMQ page and uses it', () => {
  beforeEach(() => cy.visit('/'))
  it('passes', () => {
    cy.visit('/')
    cy.get('a[href*="/materias/FEMEC"]').click()
    cy.get('a[href*="/materias/FEMEC/MMQ"]').click()
    cy.getCyData('example').click()
    cy.getCyData('xInputBox').should("contain", "1; 2; 3; 4; 5; 6 somente números . , ou ; são lidos")
    cy.getCyData('yInputBox').should("contain", "1; 1.5; 4; 4,5; 5.8; 7")
    cy.getCyData('oInputBox').should("contain", "0.3; 0.3; 0.5; 0.2; 0.4; 0.6 clique no botão no fim da página.")

    cy.getCyData('computeButton').click()
    cy.getCyData('o2Result').should("have.text", "60.24999999999999")
    cy.getCyData('xResult').should("have.text", "3.20746887966805")
    cy.getCyData('x2Result').should("have.text", "12.411710465652375")
    cy.getCyData('yResult').should("have.text", "3.518211157215307")
    cy.getCyData('xyResult').should("have.text", "13.947902259105579")
    cy.getCyData('aResult').should("have.text", "1.2540172941812284")
    cy.getCyData('bResult').should("have.text", "-0.504010288436517")
    cy.getCyData('daResult').should("have.text", "0.08840140351078707")
    cy.getCyData('dbResult').should("have.text", "0.31144042128716926")
  })
})

export { }