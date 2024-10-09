describe('Investor Enrollment page', () => {
  it('', () => {
    const image = 'sample_passport.jpg'

    cy.visit('http://localhost:3000/enroll');

    cy.get('button[data-variant="gradient"]')
      .contains('Investor')
      .click();

    cy.get('label')
      .contains('Firstname')
      .parent()
      .find('input')
      .type('Lee');

    cy.get('label')
      .contains('Lastname')
      .parent()
      .find('input')
      .type('Jackson');

    cy.get('label')
      .contains('Email')
      .parent()
      .find('input')
      .type('lee.j@gmail.com');

    cy.get('label')
      .contains('Nationality')
      .parent()
      .find('input')
      .type('Chinese');

    cy.get('label')
      .contains('Passport number')
      .parent()
      .find('input')
      .type('696969696969');

    cy.get('label')
      .contains('Phone number')
      .parent()
      .find('input')
      .type('0123456789');

    cy.get('label')
      .contains('Birthdate')
      .parent()
      .find('input')
      .type('1969-04-20');

    cy.get('label')
      .contains('Address')
      .parent()
      .find('textarea')
      .type('sample address');

    cy.get('label')
      .contains('Occupation')
      .parent()
      .find('input')
      .type('Detective');

    cy.get('label')
      .contains('Income')
      .parent()
      .find('input')
      .type('42424242420');

    cy.get('label')
      .contains('Category')
      .parent()
      .find('input')
      .click();

    cy.get('div[role="option"]')
      .contains('Sport')
      .click();

    cy.get('div[role="presentation"]')
      .attachFile(image, { subjectType: 'drag-n-drop' });

    cy.get('img[alt="Preview"]');

    cy.get('button')
      .contains('Submit')
      .click();
  });
});
