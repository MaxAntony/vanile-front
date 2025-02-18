describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Debe mostrar la barra de navegación con el logo y los enlaces', () => {
    cy.get('a').contains('VANILE').should('be.visible');
    cy.get('button').contains('Ingresar').should('be.visible');
  });

  it('Debe navegar a la página de login al hacer clic en el enlace', () => {
    cy.get('a').contains('Ingresar').click();
    cy.url().should('include', '/login');
  });
});
