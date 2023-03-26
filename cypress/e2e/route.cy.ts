describe('app works correctly with routes', () => {
  before(function() {
    cy.visit('/');
  });

  it("should open page by default", () => {
    cy.visit('/');
    cy.contains("МБОУ АЛГОСОШ");
  });

  it('should open page recursion', () => {
    cy.visit('/recursion');
    cy.contains('Строка');
  })

  it('should open page fibonacci', () => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  })

  it('should open page sorting', () => {
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
  })

  it('should open page stack', () => {
    cy.visit('/stack');
    cy.contains('Стек');
  })

  it('should open page list', () => {
    cy.visit('/list');
    cy.contains('Связный список');
  })

  it('should open page queue', () => {
    cy.visit('/queue');
    cy.contains('Очередь');
  })

})