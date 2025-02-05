describe('Full Validation of Login Page', () => {
    before(() => {
        cy.visit('/')
    })

    it('Logs in successfully with valid credentials', () => {
        cy.contains('Swag Labs').should('be.visible');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    })
})