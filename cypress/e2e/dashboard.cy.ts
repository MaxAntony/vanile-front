describe('Main Layout', () => {
  beforeEach(() => {
    cy.visit('/login');

    // Simular inicio de sesión
    cy.get('input[name="email"]').type('max@mail.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button').contains('Ingresar').click();

    // Esperar redirección al dashboard
    cy.url().should('include', '/dashboard');
  });

  it('Debe mostrar la barra lateral con enlaces correctos', () => {
    cy.get('a').contains('VANILE').should('be.visible');
    cy.get('a').contains('Inicio').should('be.visible');
    cy.get('a').contains('Productos').should('be.visible');
    cy.get('a').contains('Ventas').should('be.visible');
    cy.get('a').contains('Usuarios').should('be.visible');
  });

  it('Debe navegar correctamente a la sección de productos', () => {
    cy.get('a').contains('Productos').click();
    cy.url().should('include', '/dashboard/products');
  });
});
