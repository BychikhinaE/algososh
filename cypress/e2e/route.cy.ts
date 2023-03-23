const url = 'http://localhost:3000'

describe('app works correctly with routes', () => {
  before(function() {
    cy.visit(url);
  });

  it("should open page by default", () => {
    cy.visit(url);
    cy.contains("МБОУ АЛГОСОШ");
  });

  it('should open page recursion', () => {
    cy.visit(`${url}/recursion`);
    cy.contains('Строка');
  })

  it('should open page fibonacci', () => {
    cy.visit(`${url}/fibonacci`);
    cy.contains('Последовательность Фибоначчи');
  })

  it('should open page sorting', () => {
    cy.visit(`${url}/sorting`);
    cy.contains('Сортировка массива');
  })

  it('should open page stack', () => {
    cy.visit(`${url}/stack`);
    cy.contains('Стек');
  })

  it('should open page list', () => {
    cy.visit(`${url}/list`);
    cy.contains('Связный список');
  })

  it('should open page queue', () => {
    cy.visit(`${url}/queue`);
    cy.contains('Очередь');
  })

})