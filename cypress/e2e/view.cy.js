describe("Examine employees list content and functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/view");
  });

  it("contains correct information", () => {
    cy.get("[data-cy=header]").should("contain", "View Employees");
  });

  // My Tests
  it("should navigate back using the Back button", () => {
    cy.get("[data-cy=backButton]").click();
    cy.go("back");
  });

  it("should display a list of employees with correct data", () => {
    cy.get("tbody tr").should("have.length.greaterThan", 0);

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(1).should("contain", "Abe");
        cy.get("td").eq(2).should("contain", "Simpson");
      });
  });

  it("should delete an employee on 'Delete' button click", () => {
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("button:contains('Delete')").click();
      });

    cy.get("tbody tr").should("have.length", 1 - 1);
  });
});
