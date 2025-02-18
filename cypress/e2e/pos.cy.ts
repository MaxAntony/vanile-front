describe('POS - Punto de Venta', () => {
  beforeEach(() => {
    cy.visit('/login');

    // Simular inicio de sesión
    cy.get('input[name="email"]').type('max@mail.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button').contains('Ingresar').click();

    // Esperar redirección al dashboard
    cy.url().should('include', '/dashboard');

    // Navegar a la vista POS
    cy.get('a').contains('POS').click();
    cy.url().should('include', '/pos');
  });

  it('Debe permitir buscar y agregar un producto al carrito', () => {
    cy.get('input#outlined-basic').type('torta'); // Simula la búsqueda
    cy.wait(500); // Esperar a que se carguen los resultados

    cy.get('button').contains('Torta de chocolate').click(); // Agregar producto
    cy.get('.MuiSnackbar-root').should('contain', 'se ha añadido al carrito'); // Notificación
  });

  it('Debe modificar la cantidad de un producto en el carrito', () => {
    cy.get('button').contains('Torta de chocolate').click(); // Agregar producto
    cy.get('button').contains('PAGAR').click();
    cy.get('button[aria-label="Incrementar cantidad"]').click();
    cy.get('input[type="number"]').should('have.value', '2'); // Verifica cantidad actualizada
  });

  it('Debe eliminar un producto del carrito', () => {
    cy.get('button').contains('Torta de chocolate').click();
    cy.get('button').contains('PAGAR').click();
    cy.get('button[aria-label="Eliminar"]').click();
    cy.get('.MuiSnackbar-root').should('contain', 'ha sido removido'); // Notificación
  });

  it('Debe abrir el drawer de pago', () => {
    cy.get('button').contains('PAGAR').click();
    cy.get('.MuiDrawer-paper').should('be.visible');
  });

  it('Debe permitir confirmar una compra', () => {
    cy.get('button').contains('Torta de chocolate').click();
    cy.get('button').contains('PAGAR').click();
    cy.get('button').contains('Confirmar').click();

    cy.get('.MuiSnackbar-root').should('contain', 'Productos enviados');
  });
});
