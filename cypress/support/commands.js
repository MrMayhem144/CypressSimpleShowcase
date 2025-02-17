Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    cy.contains('Swag Labs').should('be.visible');
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
})