describe('Create Fundraising Page', () => {
  it('test fundraising creation', () => {
    const image = '1.jpg'

    cy.visit('http://localhost:3000/');

    cy.contains('Business')
      .click();

    cy.contains('Create Fundraising')
      .click();

    cy.get('label')
      .contains('Title')
      .parent()
      .find('input')
      .type('B2D');

    cy.get('label')
      .contains('Description')
      .parent()
      .find('textarea')
      .type('ABCDEFGHIJKLMNOPQRSTUVWXYZ.');

    cy.get('label')
      .contains('Goal')
      .parent()
      .find('input')
      .type('123456789');

    cy.get('label')
      .contains('Minimum investment')
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

    cy.get('label')
      .contains('Start date')
      .parent()
      .find('input')
      .type('2024-01-01');

    cy.get('label')
      .contains('End date')
      .parent()
      .find('input')
      .type('2024-01-31');

    cy.get('div[role="presentation"]')
      .attachFile(image, { subjectType: 'drag-n-drop' });

    cy.get('img[alt="Preview"]');

    cy.get('button')
      .contains('Submit')
      .click();
  });
});
