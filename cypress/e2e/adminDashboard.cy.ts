describe('Admin Dashboard page', () => {
  it('', () => {
    const image = 'sample_passport.jpg'

    cy.visit('http://localhost:3000/admin');

    cy.get('main[class="admin_table__Wi_BD"]')
      .contains('John Doe')
      .click();

    cy.get('button')
      .contains('Approval')
      .click

    cy.url().should('include', '/admin');

  });
});
