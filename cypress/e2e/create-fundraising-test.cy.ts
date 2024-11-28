describe("successful fundraising creation", () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000/');
    const role = 'business';
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

  it('submit fundraising successfully', () => {
    cy.visit('http://localhost:3000/business');
    cy.get('button[data-variant="gradient"]')
        .contains('Create Fundraising')
        .click();
    cy.url().should('include', '/business/createFund');
    cy.get('label')
        .contains('Title')
        .parent()
        .find('input')
        .type('B2D Venture');

    cy.get('label')
        .contains('Description')
        .parent()
        .find('textarea')
        .type('Become part of B2D.');

    cy.get('label')
        .contains('Goal')
        .parent()
        .find('input')
        .type('123456789');

    cy.get('label')
        .contains('Minimum Investment')
        .parent()
        .find('input')
        .type('420');

    cy.get('label')
        .contains('Category')
        .parent()
        .find('input')
        .click();

    cy.get('div[role="option"]')
        .contains('Technology')
        .click();

    cy.get('body').click({ force: true });

    cy.get('.mantine-DateTimePicker-input')
        .contains('button', 'Enter your start date')
        .click()
        .get('button[data-direction="next"]')
        .first()
        .click()
        .get('button[aria-label="1 December 2024"]')
        .click();

    cy.get('body').click({ force: true });

    cy.get('.mantine-DateTimePicker-input')
        .contains('button', 'Enter your end date')
        .click()
        .get('button[data-direction="next"]')
        .eq(1)
        .click()
        .get('button[aria-label="1 January 2025"]')
        .click();

    cy.get('body').click({ force: true });

    cy.get('input[type="file"]')
        .selectFile(
            [
                "cypress/fixtures/sample-campaign-image.jpg",
                "cypress/fixtures/sample-campaign-image-2.jpg",
                "cypress/fixtures/sample-campaign-image-3.jpg",
                "cypress/fixtures/sample-campaign-image-4.jpg",
                "cypress/fixtures/sample-campaign-image-5.jpg",
            ], {
          force: true,
        });

    cy.wait(5000);

    cy.get('label')
        .contains('Highlight')
        .parent()
        .find('textarea')
        .type('Sample highlight');

    cy.get('label')
        .contains('Product')
        .parent()
        .find('textarea')
        .type('Sample product');

    cy.get('label')
        .contains('Opportunity')
        .parent()
        .find('textarea')
        .type('Sample opportunity');

    cy.get('button')
        .contains('Submit')
        .click()

    cy.get('.mantine-Notification-root')
        .should('be.visible')
        .and('contain', 'Campaign Created!')
        .and('contain', 'Your campaign has been submitted and is awaiting approval.');

    cy.wait(3500);

  });
});

describe("missing some field when create fundraising", () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000/');
    const role = 'business';
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

  it('submit fundraising form with missing some field', () => {
    cy.visit('http://localhost:3000/business');
    cy.get('button[data-variant="gradient"]')
        .contains('Create Fundraising')
        .click();
    cy.url().should('include', '/business/createFund');
    cy.get('label')
        .contains('Title')
        .parent()
        .find('input')
        .type('B2D Venture');

    cy.get('label')
        .contains('Description')
        .parent()
        .find('textarea')
        .type('Become part of B2D.');

    cy.get('label')
        .contains('Goal')
        .parent()
        .find('input')
        .type('123456789');

    cy.get('label')
        .contains('Minimum Investment')
        .parent()
        .find('input')
        .type('420');

    cy.get('label')
        .contains('Category')
        .parent()
        .find('input')
        .click();

    cy.get('div[role="option"]')
        .contains('Technology')
        .click();

    cy.get('body').click({ force: true });

    cy.get('button')
        .contains('Submit')
        .click()

    cy.get('.mantine-Notification-root')
        .should('be.visible')
        .and('contain', 'Incomplete Form')

  });
});

