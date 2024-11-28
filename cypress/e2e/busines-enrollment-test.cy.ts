describe("unsuccessful business enrollment", () => {
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

    it('submit business enrollment form successfully', () => {
        cy.visit('http://localhost:3000/enroll/business');
        cy.get('label')
            .contains('Business name')
            .parent()
            .find('input')
            .type('Sample business name');

        cy.get('label')
            .contains('Founder Firstname')
            .parent()
            .find('input')
            .type('Sample founder name');

        cy.get('label')
            .contains('Founder Lastname')
            .parent()
            .find('input')
            .type('Sample founder lastname');

        cy.get('label')
            .contains('Email')
            .parent()
            .find('input')
            .type('mail.example.com');

        cy.get('label')
            .contains('Phone number')
            .parent()
            .find('input')
            .type('0987654321');

        cy.get('label')
            .contains('Market capitalization')
            .parent()
            .find('input')
            .type('69696969');

        cy.get('label')
            .contains('Company address')
            .parent()
            .find('textarea')
            .type('Sample address');

        cy.get('label')
            .contains('Business detail')
            .parent()
            .find('textarea')
            .type('Sample business detail');

        cy.get('label')
            .contains('Category')
            .parent()
            .find('input')
            .click();

        cy.get('div[role="option"]')
            .contains('Sport')
            .click();

        cy.get('body').click({ force: true });

        cy.get('button')
            .contains('Submit')
            .click()

        cy.get('.mantine-Notification-root')
            .should('be.visible')
            .and('contain', 'Incomplete Form')

        cy.wait(2000);

    });
});

describe("successful business enrollment", () => {
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

    it('submit business enrollment form successfully', () => {
        cy.visit('http://localhost:3000/enroll/business');
        cy.get('label')
            .contains('Business name')
            .parent()
            .find('input')
            .type('Sample business name');

        cy.get('label')
            .contains('Founder Firstname')
            .parent()
            .find('input')
            .type('Sample founder name');

        cy.get('label')
            .contains('Founder Lastname')
            .parent()
            .find('input')
            .type('Sample founder lastname');

        cy.get('label')
            .contains('Email')
            .parent()
            .find('input')
            .type('mail.example.com');

        cy.get('label')
            .contains('Phone number')
            .parent()
            .find('input')
            .type('0987654321');

        cy.get('label')
            .contains('Market capitalization')
            .parent()
            .find('input')
            .type('69696969');

        cy.get('label')
            .contains('Company address')
            .parent()
            .find('textarea')
            .type('Sample address');

        cy.get('label')
            .contains('Business detail')
            .parent()
            .find('textarea')
            .type('Sample business detail');

        cy.get('label')
            .contains('Category')
            .parent()
            .find('input')
            .click();

        cy.get('div[role="option"]')
            .contains('Sport')
            .click();

        cy.get('body').click({ force: true });

        cy.get('input[type="file"]')
            .first()
            .selectFile(
                "cypress/fixtures/sample-logo.jpg", {
                    force: true,
                });

        cy.get('input[type="file"]')
            .eq(1)
            .selectFile(
                "cypress/fixtures/sample-business-certificate.jpg", {
                    force: true,
                });

        cy.wait(5000);

        cy.get('button')
            .contains('Submit')
            .click()

        cy.get('.mantine-Notification-root')
            .should('be.visible')
            .and('contain', 'Registration Sent!')
            .and('contain', 'Your registration has been submitted. Please wait for approval.');

        cy.wait(2000);

    });
});
