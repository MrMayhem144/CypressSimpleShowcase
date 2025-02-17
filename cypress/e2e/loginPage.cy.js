describe('Full Validation of Login Page', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Logs in successfully with valid credentials', () => {
        cy.contains('Swag Labs').should('be.visible');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Gets an error message when logging in with invalid credentials', () => {
        cy.contains('Swag Labs').should('be.visible');
        cy.get('#user-name').type('testusererror');
        cy.get('#password').type('123456');
        cy.get('#login-button').click();
        cy.contains('Username and password do not match any user in this service').should('be.visible');
    });

    it('Logs out successfully', () => {
        cy.contains('Swag Labs').should('be.visible');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.bm-burger-button').click();
        cy.contains('Logout').click();
        cy.url().should('include', '/');
    });

})