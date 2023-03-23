import { cssForBorder } from "./string.cy";

describe("тест компонента Список", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.get('[data-cy="input-el"]').as("input-el");
    cy.get('[data-cy="add-head"]').as("add-head");
    cy.get('[data-cy="add-tail"]').as("add-tail");
    cy.get('[data-cy="delete-head"]').as("delete-head");
    cy.get('[data-cy="delete-tail"]').as("delete-tail");
    cy.get('[data-cy="input-index"]').as("input-index");
    cy.get('[data-cy="add-by-index"]').as("add-by-index");
    cy.get('[data-cy="delete-by-index"]').as("delete-by-index");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input-el").should("be.empty");
    cy.get("@add-head").should("be.disabled");
    cy.get("@input-index").should("be.empty");
    cy.get("@add-by-index").should("be.disabled");
    cy.get("@delete-by-index").should("be.disabled");
  });

  it("отрисовка дефолтного списка корректна", () => {
    cy.get("[class*=circle_circle]").as("els");
    cy.get("@els").should("have.length", 4);
    cy.get("@els")
      .first()
      .siblings("[class*='circle_head']")
      .should("have.text", "head");
    cy.get("@els")
      .last()
      .siblings("[class*='circle_tail']")
      .should("have.text", "tail");

    cy.get("@els").each((el, index) => {
      cy.get(el)
        .siblings("[class*='circle_index']")
        .should("have.text", String(index));
    });
  });

  it("добавление элемента в head корректно", () => {
    cy.clock();
    cy.get("[class*=circle_circle]").as("els");

    cy.get("@input-el").type("1");
    cy.get("@add-head").should("be.enabled").click();
    cy.get("@input-el").should("be.empty");
    cy.get("@add-head").should("be.disabled");

    cy.get("[class*='circle_small']")
      .should("have.text", "1")
      .and("have.css", "border-color", cssForBorder.changing);

    cy.tick(500);

    cy.get("@els")
      .first()
      .should("have.text", "1")
      .siblings("[class*='circle_head']")
      .should("have.text", "head");

    cy.get("@els").should("have.length", 5);
  });

  it("добавление элемента в tail корректно", () => {
    cy.clock();
    cy.get("[class*=circle_circle]").as("els");

    cy.get("@input-el").type("1");
    cy.get("@add-tail").should("be.enabled").click();

    cy.get("[class*='circle_small']")
      .should("have.text", "1")
      .and("have.css", "border-color", cssForBorder.changing);

    cy.tick(500);

    cy.get("@els")
      .last()
      .should("have.text", "1")
      .siblings("[class*='circle_tail']")
      .should("have.text", "tail");

    cy.get("@els").should("have.length", 5);
  });

  it("добавление элемента по индексу", () => {
    cy.clock();
    cy.get("[class*=circle_circle]").as("els");
    cy.get("@input-el").type("1");
    cy.get("@input-index").type("2");
    cy.get("@add-by-index").should("be.enabled").click();

    //Сначала маленький кружком
    cy.get("@els")
      .eq(2)
      .should("have.text", "1")
      .and("have.css", "border-color", cssForBorder.changing);
    cy.tick(500);
    //Теперь в общем списке
    cy.get("@els")
      .eq(2)
      .should("have.text", "1")
      .and("have.css", "border-color", cssForBorder.modified);

    cy.get("@els").should("have.length", 5);
  });

  it("удаление элемента из head", () => {
    cy.clock();
    cy.get("[class^=circle_circle]").as("els");

    cy.get("@delete-head").click();

    cy.get("[class*='circle_small']").should(
      "have.css",
      "border-color",
      cssForBorder.changing
    );

    cy.get("@els")
      .eq(0)
      .should("have.text", "")
      .and("have.css", "border-color", cssForBorder.changing);

    cy.tick(1000);

    cy.get("@els")
      .first()
      .should("have.css", "border-color", cssForBorder.default)
      .siblings("[class*='circle_head']")
      .should("have.text", "head");

    cy.get("@els").should("have.length", 3);
  });

  it("удаление элемента из tail", () => {
    cy.clock();
    cy.get("[class*=circle_circle]").as("els");

    cy.get("@delete-tail").should("be.enabled").click();

    cy.get("[class*='circle_small']").and(
      "have.css",
      "border-color",
      cssForBorder.changing
    );

    cy.get("@els")
      .eq(3)
      .should("have.text", "")
      .and("have.css", "border-color", cssForBorder.changing);

    cy.tick(1000);

    cy.get("@els")
      .last()
      .should("have.css", "border-color", cssForBorder.default)
      .siblings("[class*='circle_tail']")
      .should("have.text", "tail");

    cy.get("@els").should("have.length", 3);
  });

  it("удаление элемента  по индексу", () => {
    cy.clock();
    cy.get("[class*=circle_circle]").as("els");

    cy.get("@input-index").type("2");
    cy.get("@delete-by-index").should("be.enabled").click();

    //большой пустой кружок
    cy.get("@els")
      .eq(2)
      .should("have.text", "")
      .and("have.css", "border-color", cssForBorder.changing);
    cy.get("@els")
      .eq(3)
      .should("have.css", "border-color", cssForBorder.changing);
    cy.tick(500);

    cy.get("@els")
      .eq(2)
      .should("have.css", "border-color", cssForBorder.default);
    cy.get("@els").should("have.length", 3);
  });
});
