describe('Full validation of Products Page', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    });

    it('Visit the products page successfully', () => {
        cy.url().should('include', '/inventory.html');
    });

    it('Verify that all products (6) are displayed', () => {
        cy.get('.inventory_item').should('have.length', 6);
    });

    it('Test if clicking on a product leads to its detailed page', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.get('.inventory_item_name').click(); 
        });
        cy.get('[data-test="inventory-item-desc"]').should('contain', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')

    });

    it('Verifies product names, descriptions, and prices are correctly displayed', () => {
        cy.get('.inventory_item').should('have.length', 6);  // Ensure exactly 6 products are displayed.
    
        cy.get('.inventory_item').each(($item) => {
            cy.wrap($item).within(() => {
                cy.get('.inventory_item_name').should('be.visible').invoke('text').then((name) => {
                    cy.wrap($item).should('contain', name);
                });
    
                cy.get('.inventory_item_desc').should('be.visible').invoke('text').then((description) => {
                    cy.wrap($item).should('contain', description);
                });
    
                cy.get('.inventory_item_price').should('be.visible').invoke('text').then((price) => {
                    cy.wrap($item).should('contain', price);
                });
            });
        });
    });

    it('Verifies that a product can be added to the cart', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.get('.inventory_item_name').click();  // Click the first product's name (usually a link).
        });
        cy.get('.btn_inventory').should('be.visible').click();
        cy.get('.shopping_cart_link').should('be.visible').click();
        cy.url().should('include', '/cart.html');
    });

    it('Verifies that a product can be removed from the cart', () => {
        cy.contains('Swag Labs').should('be.visible');
        cy.get('.bm-burger-button').click();
        cy.contains('All Items').click();
        cy.get('.inventory_item').first().within(() => {
            cy.get('.inventory_item_name').click(); 
        });
        cy.get('.btn_inventory').should('be.visible').click();
        cy.get('.shopping_cart_link').should('be.visible').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_button').click();
        cy.contains('Sauce Labs Backpack').should('not.exist');
    });

    it('Verify that the cart counter is updated', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    });

    it('Verify the sorting functionality', () => {
        cy.get('.product_sort_container').should('be.visible'); // Ensure the sorting container is visible.
        
        cy.get('.product_sort_container').select('Price (low to high)');
        cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Onesie');

        cy.get('.product_sort_container').select('Price (high to low)');
        cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Fleece Jacket');

        cy.get('.product_sort_container').select('Name (Z to A)');
        cy.get('.inventory_item_name').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    });

});
