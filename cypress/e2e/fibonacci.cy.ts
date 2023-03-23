const testFibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

describe("тест компонента фибоначчи", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button"]').as("button");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("числа генерируются корректно", () => {
    cy.clock();
    cy.get("@input").type(testFibonacci.length - 1);
    cy.get("@button").should("be.enabled").click();

    cy.get("[class^='circle_circle']").each((el, index) => {
      cy.get(el).contains(testFibonacci[index]);
      cy.tick(500);
    });
  });
});
