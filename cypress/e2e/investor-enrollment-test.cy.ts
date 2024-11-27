describe("successful investor enrollment", () => {
    beforeEach(() => {
        cy.viewport('macbook-15');
        cy.visit('http://localhost:3000/');
        const role = 'investor';
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

    it('submit investor enrollment form successfully', () => {
        cy.visit('http://localhost:3000/enroll/investor');

        cy.get('label')
            .contains('Firstname')
            .parent()
            .find('input')
            .type('Tracy');

        cy.get('label')
            .contains('Lastname')
            .parent()
            .find('input')
            .type('Mills');

        cy.get('label')
            .contains('Email')
            .parent()
            .find('input')
            .type('tracy.m@example.com');

        cy.get('label')
            .contains('Nationality')
            .parent()
            .find('input')
            .type('Congolian');

        cy.get('label')
            .contains('Passport number')
            .parent()
            .find('input')
            .type('1234567890123');

        cy.get('label')
            .contains('Phone number')
            .parent()
            .find('input')
            .type('0987654321');

        cy.get('.mantine-DateTimePicker-input')
            .contains('button', 'Enter your birthday')
            .click()
            .get('.mantine-DateTimePicker-calendarHeaderLevel')
            .click()
            .get('.mantine-DateTimePicker-calendarHeaderLevel')
            .click()
            .get('button[data-direction="previous"]')
            .click()
            .get('button[data-direction="previous"]')
            .click()
            .get('.mantine-DateTimePicker-yearsListControl')
            .contains('button', '2001')
            .click()
            .get('.mantine-DateTimePicker-monthsListControl')
            .contains('button', 'Feb')
            .click()
            .get('.mantine-DateTimePicker-day')
            .contains('button', '20')
            .click();

        cy.get('body').click({ force: true });

        cy.get('label')
            .contains('Address')
            .parent()
            .find('textarea')
            .type('Sample Address');

        cy.get('label')
            .contains('Occupation')
            .parent()
            .find('input')
            .type("Detective's wife");

        cy.get('label')
            .contains('Income')
            .parent()
            .find('input')
            .type('300000');

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/sample-passport.jpg', {
                force: true,
            });

        cy.wait(4000);

        cy.get('button')
            .contains('Submit')
            .click();

        cy.get('.mantine-Notification-root')
            .should('be.visible')
            .and('contain', 'Registration Sent!')
            .and('contain', 'Your registration has been submitted. Please wait for approval.');

        cy.wait(4500);
    });
});

describe("unsuccessful investor enrollment", () => {
    beforeEach(() => {
        cy.viewport('macbook-15');
        cy.visit('http://localhost:3000/');
        const secondRole = 'guest';
        cy.clerkSignIn({strategy: 'email_code', identifier: `${secondRole}+clerk_test@example.com`})
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

    it('submit investor enrollment form which miss some information', () => {
        cy.visit('http://localhost:3000/enroll/investor');

        cy.get('label')
            .contains('Firstname')
            .parent()
            .find('input')
            .type('Tracy');

        cy.get('label')
            .contains('Lastname')
            .parent()
            .find('input')
            .type('Mills');

        cy.get('label')
            .contains('Email')
            .parent()
            .find('input')
            .type('tracy.m@example.com');

        cy.get('label')
            .contains('Nationality')
            .parent()
            .find('input')
            .type('Congolian');

        cy.get('label')
            .contains('Passport number')
            .parent()
            .find('input')
            .type('1234567890123');

        cy.get('label')
            .contains('Phone number')
            .parent()
            .find('input')
            .type('0987654321');

        cy.get('.mantine-DateTimePicker-input')
            .contains('button', 'Enter your birthday')
            .click()
            .get('.mantine-DateTimePicker-calendarHeaderLevel')
            .click()
            .get('.mantine-DateTimePicker-calendarHeaderLevel')
            .click()
            .get('button[data-direction="previous"]')
            .click()
            .get('button[data-direction="previous"]')
            .click()
            .get('.mantine-DateTimePicker-yearsListControl')
            .contains('button', '2001')
            .click()
            .get('.mantine-DateTimePicker-monthsListControl')
            .contains('button', 'Feb')
            .click()
            .get('.mantine-DateTimePicker-day')
            .contains('button', '20')
            .click();

        cy.get('body').click({ force: true });

        cy.get('button')
            .contains('Submit')
            .click();

        cy.get('.mantine-Notification-root')
            .should('be.visible')
            .and('contain', 'Incomplete Form');

        cy.wait(4500);
    });
});



