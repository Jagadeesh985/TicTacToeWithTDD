describe("Creating a TicTacToe game", () => {
  it("Display the tic tac toe game", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="board"]').should("exist");
  });

  it("Should have 9 square buttons", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').should("have.length", 9);
  });

  it("All 9 sqaures should initialized with null/empty", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testId="square-button"]').each(($square) => {
      cy.wrap($square).should("have.text", "");
    });
  });

  it("When the square button first time clicked, the square should contain the value X", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').first().click();
    cy.get('[data-testId="square-button"]').first().should("have.text", "X");
  });

  it("When the second time square button  clicked, the square should contain the value O", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').first().click();
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(1).should("have.text", "O");
  });

  it("Initially the next player should be X", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="status"]').should("contain.text", "Next Player: X");
  });

  it("After one click the next player should be O", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="status"]').should("contain.text", "Next Player: O");
  });

  it("Same sqaure Value should not be changed after one click", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(1).should("have.text", "X");
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(1).should("have.text", "X");
  });

  it("if any player won the game , then it should display in the status as Winner: X", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').eq(4).click();
    cy.get('[data-testId="square-button"]').eq(2).click();
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(0).click();
    cy.get('[data-testId="square-button"]').eq(7).click();
    cy.get('[data-testId="status"]').should("contain.text", "Winner: X");
  });

  it("if any player won the game , then it should display in the status as Winner: O", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').eq(2).click();
    cy.get('[data-testId="square-button"]').eq(4).click();
    cy.get('[data-testId="square-button"]').eq(5).click();
    cy.get('[data-testId="square-button"]').eq(8).click();
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(0).click();
    cy.get('[data-testId="status"]').should("contain.text", "Winner: O");
  });

  it("After declaring the winner the square buttons should not clickable", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testId="square-button"]').eq(2).click();
    cy.get('[data-testId="square-button"]').eq(4).click();
    cy.get('[data-testId="square-button"]').eq(5).click();
    cy.get('[data-testId="square-button"]').eq(8).click();
    cy.get('[data-testId="square-button"]').eq(1).click();
    cy.get('[data-testId="square-button"]').eq(0).click();
    cy.get('[data-testId="status"]').should("contain.text", "Winner: O");
    cy.get('[data-testId="square-button"]').eq(3).click();
    cy.get('[data-testId="square-button"]').eq(3).should("have.text", "");
  });
});
