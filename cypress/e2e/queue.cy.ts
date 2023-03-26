import { circles, headCircle, tailCircle, cssForBorder } from "./constants";
const testInput = ["1", null, "2", null, "3", null];
const testInputAnimation = [
  [{ item: "", state: cssForBorder.changing, head: "", tail: "" }],

  [{ item: "1", state: cssForBorder.default, head: "head", tail: "tail" }],

  [
    { item: "1", state: cssForBorder.default, head: "head", tail: "tail" },
    { item: "", state: cssForBorder.changing, head: "", tail: "" },
  ],

  [
    { item: "1", state: cssForBorder.default, head: "head", tail: "" },
    { item: "2", state: cssForBorder.default, head: "", tail: "tail" },
  ],
  [
    { item: "1", state: cssForBorder.default, head: "head", tail: "" },
    { item: "2", state: cssForBorder.default, head: "", tail: "tail" },
    { item: "", state: cssForBorder.changing, head: "", tail: "" },
  ],
  [
    { item: "1", state: cssForBorder.default, head: "head", tail: "" },
    { item: "2", state: cssForBorder.default, head: "", tail: "" },
    { item: "3", state: cssForBorder.default, head: "", tail: "tail" },
  ],
];

describe("тест компонента Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="btn-add"]').as("btn-add");
    cy.get('[data-cy="btn-delete"]').as("btn-delete");
    cy.get('[data-cy="btn-clean"]').as("btn-clean");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("be.empty");
    cy.get("@btn-add").should("be.disabled");
  });

  it("элементы добавляются корректно", () => {
    cy.clock();

    testInputAnimation.forEach((step, indStep) => {
      const len = step.length;
      if (testInput[indStep]) {
        cy.get("@input").type(testInput[indStep]);
        cy.get("@btn-add").should("be.enabled").click();
      }

      cy.get(circles).each((el, index) => {
        if (index < len) {
          cy.get(el).should("have.text", step[index].item);

          cy.get(el).should("have.css", "border-color", step[index].state);
          cy.get(el)
            .siblings(headCircle)
            .should("have.text", step[index].head);
          cy.get(el)
            .siblings(tailCircle)
            .should("have.text", step[index].tail);
        }
      });
      cy.tick(500);
    });

    cy.get("@btn-delete").should("be.enabled");
    cy.get("@btn-clean").should("be.enabled");
  });

  it("элементы удаляются корректно", () => {
    cy.clock();

    testInput.forEach((item) => {
      if (item) {
        cy.get("@input").type(item);
        cy.get("@btn-add").should("be.enabled").click();
        cy.tick(500);
      }
    });

    cy.get("@btn-delete").should("be.enabled").click();

    cy.tick(500);
    cy.get(circles).as("els");

    cy.get("@els").then((item) => {
      cy.get(item[1]).contains("2");
      cy.get(item[1]).should("have.css", "border-color", cssForBorder.default);
      cy.get(item[1])
        .siblings(headCircle)
        .should("have.text", "head");
      cy.get(item[1])
        .siblings(tailCircle)
        .should("have.text", "");

      cy.get(item[2]).contains("3");
      cy.get(item[2]).should("have.css", "border-color", cssForBorder.default);
      cy.get(item[2])
        .siblings(headCircle)
        .should("have.text", "");
      cy.get(item[2])
        .siblings(tailCircle)
        .should("have.text", "tail");
    });

    cy.get("@btn-add").should("be.disabled");
  });

  it("кнопка «Очистить» работает правильно", () => {
    cy.clock();

    testInput.forEach((item) => {
      if (item) {
        cy.get("@input").type(item);
        cy.get("@btn-add").should("be.enabled").click();
        cy.tick(500);
      }
    });

    cy.get("@btn-clean").should("be.enabled").click();
    cy.tick(500);

    cy.get(circles).each((el) => {
      cy.get(el).should("have.text", "");
      cy.get(el).should("have.css", "border-color", cssForBorder.default);
      cy.get(el).siblings(headCircle).should("have.text", "");
      cy.get(el).siblings(tailCircle).should("have.text", "");
    });

    cy.get("@btn-delete").should("be.disabled");
    cy.get("@btn-clean").should("be.disabled");
  });

});
