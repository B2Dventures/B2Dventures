describe('Create Fundraising Page', () => {
  it('sign in with Account Portal redirects', () => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000/');
    const role = 'admin';
    cy.clerkSignIn({strategy: 'email_code', identifier: `${role}+clerk_test@example.com`})
    cy.on('uncaught:exception', (err, runnable) => {
      if (
          /hydrat/i.test(err.message) ||
          /Minified React error #418/.test(err.message) ||
          /Minified React error #423/.test(err.message)
      ) {
        return false;
      }
    });
  });
});