import '../../../../support/commands'
import dashboardPage from '../../../../support/pages/orangeHrm/dashboard.page';
import loginPage from '../../../../support/pages/orangeHrm/login.page.js';
import loginPom from '../../../../support/pom/orangeHrm/login/login.pom.js';
const login = require('../../../../fixtures/json/orangeHrm/login/login.json');
const dashboard = require('../../../../fixtures/json/orangeHrm/dashboard/dashboard.json');

require('cypress-xpath');

describe('Funtional Login Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.url().should('include', '/auth/login');
  });

  // Custom Commands and POM and json

  it('Custom commands - Verify successful login with valid credentials', () => {
    cy.login(login.username, login.password);
    cy.intercept('GET', '**/action-summary').as('actionSummary')
    loginPage.clickLoginButton();
    cy.wait('@actionSummary').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    })
    dashboardPage.verifyDashboardUrl(); // verify dashboard url
    dashboardPage.verifyDashboardTitle(dashboard.dashboard_title); // verify dasshboard title
  })

  it('Custom commands - Verify failed login with invalid username', () => {
    cy.login(login.invalid_username, login.password);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('Custom commands - Verify failed login with invalid password', () => {
    cy.login(login.username, login.invalid_password);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('Custom commands - Verify failed login with invalid username and password', () => {
    cy.login(login.invalid_username, login.invalid_password);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('Custom commands - Verify failed login with empty username', () => {
    cy.login(login.empty_username, login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive(); // verify error username field is visible
  })

  it('Custom commands -  Verify failed login with empty password', () => {
    cy.login(login.username, login.empty_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it('Custom commands - Verify failed login with empty username and password', () => {
    cy.login(login.empty_username, login.empty_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field) // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive();  // verify error username field is visible
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it('Custom commands - Verify failed login with username and password swapped', () => {
    cy.login(login.password, login.username);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })

  // Page Object Modeling (POM)

  it('POM non-static - Verify successful login with valid credentials', () => {
    cy.get(loginPage.username).type(login.username);
    cy.get(loginPage.password).type(login.password);
    cy.intercept('GET', '**/action-summary').as('actionSummary')
    loginPage.clickLoginButton();
    cy.wait('@actionSummary').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    })
    dashboardPage.verifyDashboardUrl(); // verify dashboard url
    dashboardPage.verifyDashboardTitle(dashboard.dashboard_title); // verify dasshboard title
  })

  it('POM non-static - Verify failed login with invalid username', () => {
    cy.get(loginPage.username).type(login.invalid_username);
    cy.get(loginPage.password).type(login.password);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })

  it('POM non-static - Verify failed login with invalid password', () => {
    cy.get(loginPage.username).type(login.username);
    cy.get(loginPage.password).type(login.invalid_password);
    cy.intercept('GET', '**/messages').as('messages');
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it.only('POM non-static - Verify failed login with invalid username and password', () => {
    cy.get(loginPage.username).type(login.invalid_username);
    cy.get(loginPage.password).type(login.invalid_password);
    cy.intercept('GET', '**/messages').as('messages')
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('POM non-static - Verify failed login with empty username', () => { // cannot call intercept
    cy.get(loginPage.password).type(login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive(); // verify error username field is visible
  })

  it('POM non-static - Verify failed login with empty password', () => { // cannot call intercept
    cy.get(loginPage.username).type(login.username);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it('POM non-static - Verify failed login with empty username and password', () => { // cannot call intercept
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field) // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive();  // verify error username field is visible
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it.only('POM non-static - Verify failed login with username and password swapped', () => {
    cy.get(loginPage.username).type(login.password);
    cy.get(loginPage.password).type(login.username);
    cy.intercept('GET', '**/messages').as('messages')
    loginPage.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })

  // POM Best Practice with static paradigma

  it('POM static - Verify successful login with valid credentials', () => {
    loginPom.inputUsername().type(login.username)
    loginPom.inputPassword().type(login.password)
    cy.intercept('GET', '**/action-summary').as('actionSummary')
    loginPom.clickLoginButton();
    cy.wait('@actionSummary').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    })
    dashboardPage.verifyDashboardUrl(); // verify dashboard url
    dashboardPage.verifyDashboardTitle(dashboard.dashboard_title); // verify dasshboard title
  })

  it('POM static - Verify failed login with invalid username', () => {
    loginPom.inputUsername().type(login.invalid_username)
    loginPom.inputPassword().type(login.password)
    cy.intercept('GET', '**/messages').as('messages')
    loginPom.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPom.verifyTextMsgFailedLogin(login.message.msg_failed_login);
    loginPom.verifyExistMsgFailedLogin();
  })

  it('POM static - Verify failed login with invalid password', () => {
    loginPom.inputUsername().type(login.username)
    loginPom.inputPassword().type(login.invalid_password)
    cy.intercept('GET', '**/messages').as('messages')
    loginPom.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPom.verifyTextMsgFailedLogin(login.message.msg_failed_login);
    loginPom.verifyExistMsgFailedLogin();
  })

  it('POM static - Verify failed login with invalid username and password', () => {
    loginPom.inputUsername().type(login.invalid_username)
    loginPom.inputPassword().type(login.invalid_password)
    cy.intercept('GET', '**/messages').as('messages')
    loginPom.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPom.verifyTextMsgFailedLogin(login.message.msg_failed_login);
    loginPom.verifyExistMsgFailedLogin();
  })

  it('POM static - Verify failed login with empty username', () => { // cannot call intercept
    loginPom.inputPassword().type(login.invalid_password)
    loginPom.clickLoginButton();
    loginPom.verifyExistMsgRequiredField();
    loginPom.verifyTextMsgRequiredField(login.message.msg_empty_field);
    loginPom.verifyErrorUsernameFieldActive();
  })

  it('POM static - Verify failed login with empty password', () => { // cannot call intercept
    loginPom.inputUsername().type(login.invalid_username)
    loginPom.clickLoginButton();
    loginPom.verifyExistMsgRequiredField();
    loginPom.verifyTextMsgRequiredField(login.message.msg_empty_field);
    loginPom.verifyErrorPassswordFieldActive();
  })

  it('POM static - Verify failed login with empty username and password', () => { // cannot call intercept
    loginPom.clickLoginButton();
    loginPom.verifyExistMsgRequiredField();
    loginPom.verifyTextMsgRequiredField(login.message.msg_empty_field);
    loginPom.verifyErrorUsernameFieldActive();
    loginPom.verifyErrorPassswordFieldActive();
  })

  it('POM static - Verify failed login with username and password swapped', () => {
    loginPom.inputUsername().type(login.password)
    loginPom.inputPassword().type(login.username)
    cy.intercept('GET', '**/messages').as('messages')
    loginPom.clickLoginButton();
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    })
    loginPom.verifyExistMsgFailedLogin();
    loginPom.verifyTextMsgFailedLogin(login.message.msg_failed_login);
  })

})