// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login

Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="username"]').clear().type(username);
    cy.get('input[name="password"]').clear().type(password);
})

Cypress.Commands.add('msgFailedLogin', (message) => {
    cy.get('p[class*="oxd-alert-content-text"]').should('contain.text', message);
})

Cypress.Commands.add('msgRequiredField', (message) => {
    cy.get('span[class*="oxd-input-field-error-message"]').should('contain.text', message);
})

// Dashboard

Cypress.Commands.add('urlDashboard', () => {
    cy.url().should('include', '/dashboard/index');
})