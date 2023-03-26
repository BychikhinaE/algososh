import { circles, cssForBorder } from "./constants";

const testStepsReverse = [
  [
    { item: "1", state: cssForBorder.changing },
    { item: "2", state: cssForBorder.default },
    { item: "3", state: cssForBorder.default },
    { item: "4", state: cssForBorder.default },
    { item: "5", state: cssForBorder.changing },
  ],
  [
    { item: "5", state: cssForBorder.modified },
    { item: "2", state: cssForBorder.changing },
    { item: "3", state: cssForBorder.default },
    { item: "4", state: cssForBorder.changing },
    { item: "1", state: cssForBorder.modified },
  ],
  [
    { item: "5", state: cssForBorder.modified },
    { item: "4", state: cssForBorder.modified },
    { item: "3", state: cssForBorder.changing },
    { item: "2", state: cssForBorder.modified },
    { item: "1", state: cssForBorder.modified },
  ],
  [
    { item: "5", state: cssForBorder.modified },
    { item: "4", state: cssForBorder.modified },
    { item: "3", state: cssForBorder.modified },
    { item: "2", state: cssForBorder.modified },
    { item: "1", state: cssForBorder.modified },
  ],
];

describe("тест компонента строка", () => {
  beforeEach(() => {
    cy.visit("/recursion");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="button"]').as("button");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("строка разворачивается корректно", () => {
    cy.clock();
    cy.get("@input").type("12345");
    cy.get("@button").should("be.enabled").click();

    testStepsReverse.forEach((step) => {
      cy.get(circles)
        .should("have.length", 5)
        .each((el, index) => {
          cy.get(el).contains(step[index].item);
          cy.get(el).should("have.css", "border-color", step[index].state);
        });
      cy.tick(1000);
    });
  });
});
