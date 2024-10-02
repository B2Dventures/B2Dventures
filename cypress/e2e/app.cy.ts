describe('Navigation', () => {

    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "about" and click it
        cy.contains('Business').click();

        // The new url should include "/about"
        cy.url().should('include', '/business')

//    // The new page should contain an h1 with "About"
//    cy.get('h1').contains('About')
    })
})

