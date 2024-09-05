describe('navigates to the MMQ page and uses it', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('passes', () => {
    cy.get('a[href*="/calcs/MMQ"]').click()

    cy.getCyData('example').click()
    const example_data = [
      { x: 1, y: 1, o: 0.3 },
      { x: 2, y: 1.5, o: 0.3 },
      { x: 3, y: 4, o: 0.5 },
      { x: 4, y: 4.5, o: 0.2 },
      { x: 5, y: 5.8, o: 0.4 },
      { x: 6, y: 7, o: 0.6 },
    ]
    example_data.forEach((v, idx) => {
      cy.getCyData(`ipt_x_${idx}`).should("have.value", v.x)
      cy.getCyData(`ipt_y_${idx}`).should("have.value", v.y)
      cy.getCyData(`ipt_o_${idx}`).should("have.value", v.o)
    })

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

  it('passes', () => {
    cy.get('a[href*="/calcs/MMQ"]').click()

    const example_data = [
      { x: "0.9", y: "16", o: "1" },
      { x: "1.87", y: "33", o: "1" },
      { x: "2.95", y: "52", o: "1" },
    ]

    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()

    example_data.forEach((v, idx) => {
      cy.getCyData(`ipt_x_${idx + 1}`).type(v.x)
      cy.getCyData(`ipt_y_${idx + 1}`).type(v.y)
      cy.getCyData(`ipt_o_${idx + 1}`).type(v.o)
    })

    cy.getCyData(`delete_row_${5}`).click()
    cy.getCyData(`delete_row_${4}`).click()
    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()
    cy.getCyData(`delete_row_${4}`).click()
    cy.getCyData(`delete_row_${4}`).click()
    cy.getCyData(`delete_row_${0}`).click()

    cy.getCyData("new_line").click()
    cy.getCyData("new_line").click()
    cy.getCyData(`ipt_x_${3}`).type("9999.999")
    cy.getCyData(`ipt_y_${3}`).type("99999")
    cy.getCyData(`ipt_o_${3}`).type("999999")
    cy.getCyData(`delete_row_${3}`).click()
    cy.getCyData(`ipt_x_${3}`).type("3.94")
    cy.getCyData(`ipt_y_${3}`).type("70")
    cy.getCyData(`ipt_o_${3}`).type("1")

    cy.getCyData('computeButton').click()
    cy.getCyData('o2Result').should("have.text", "4")
    cy.getCyData('xResult').should("have.text", "2.415")
    cy.getCyData('x2Result').should("have.text", "7.13325")
    cy.getCyData('yResult').should("have.text", "42.75")
    cy.getCyData('xyResult').should("have.text", "126.3275")
    cy.getCyData('aResult').should("have.text", "17.744662861974206")
    cy.getCyData('bResult').should("have.text", "-0.10336081166770583")
    cy.getCyData('daResult').should("have.text", "0.4383562301904692")
    cy.getCyData('dbResult').should("have.text", "1.1707681680924105")
  })
})

export { }