import { cssForBorder } from "./string.cy";

const testInput = ["1", null, "2", null, "3", null];
//для проверки анимации при добавлении элементов
const testInputAnimation = [
  [{ item: "1", state: cssForBorder.changing, marker: "top" }],
  [{ item: "1", state: cssForBorder.default, marker: "top" }],

  [
    { item: "1", state: cssForBorder.default, marker: "" },
    { item: "2", state: cssForBorder.changing, marker: "top" },
  ],
  [
    { item: "1", state: cssForBorder.default, marker: "" },
    { item: "2", state: cssForBorder.default, marker: "top" },
  ],

  [
    { item: "1", state: cssForBorder.default, marker: "" },
    { item: "2", state: cssForBorder.default, marker: "" },
    { item: "3", state: cssForBorder.changing, marker: "top" },
  ],
  [
    { item: "1", state: cssForBorder.default, marker: "" },
    { item: "2", state: cssForBorder.default, marker: "" },
    { item: "3", state: cssForBorder.default, marker: "top" },
  ],
];

describe("тест компонента стек", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
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

    //Длина отрисованного массива
    let lenCicleArray = 0;
    testInputAnimation.forEach((step, indStep) => {
      //добавляем существующие элементы, иначе просто проверяем анимацию
      if (testInput[indStep]) {
        cy.get("@input").type(testInput[indStep]);
        cy.get("@btn-add").should("be.enabled").click();
        lenCicleArray++;
      }

      cy.get("[class^='circle_circle']")
        .should("have.length", lenCicleArray)
        .each((el, index) => {
          cy.get(el).contains(step[index].item);
          cy.get(el).should("have.css", "border-color", step[index].state);
          cy.get(el)
            .siblings("[class*='circle_head']")
            .should("have.text", step[index].marker);
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
    cy.get("[class*='circle_circle']").as("els").should("have.length", 2);

    cy.get("@els").then((item) => {
      cy.get(item[0]).contains("1");
      cy.get(item[0]).should("have.css", "border-color", cssForBorder.default);
      cy.get(item[0])
        .siblings("[class*='circle_head']")
        .should("have.text", "");
      cy.get(item[1]).contains("2");
      cy.get(item[1]).should("have.css", "border-color", cssForBorder.default);
      cy.get(item[1])
        .siblings("[class*='circle_head']")
        .should("have.text", "top");
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
    cy.get("[class^='circle_circle']").should("not.exist");

    cy.get("@btn-add").should("be.disabled");

    cy.get("@btn-delete").should("be.disabled");
    cy.get("@btn-clean").should("be.disabled");
  });
});
