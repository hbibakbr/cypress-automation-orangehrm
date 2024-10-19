import '../../../../support/commands'
import dashboardPage from '../../../../support/pages/orangeHrm/dashboard.page';
import loginPage from '../../../../support/pages/orangeHrm/login.page';
const login = require('../../../../fixtures/json/orangeHrm/login/login.json');
const dashboard = require('../../../../fixtures/json/orangeHrm/dashboard/dashboard.json');

require('cypress-xpath');

describe('Funtional Login Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.url().should('include', '/auth/login');
  });

  // Custom Commands and POM and json

  it.only('Verify successful login with valid credentials', () => {
    cy.login(login.username, login.password);
    loginPage.clickLoginButton();
    dashboardPage.verifyDashboardUrl(); // verify dashboard url
    dashboardPage.verifyDashboardTitle(dashboard.dashboard_title); // verify dasshboard title
  })

  it.only('Verify failed login with invalid username', () => {
    cy.login(login.invalid_username, login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it.only('Verify failed login with invalid password', () => {
    cy.login(login.username, login.invalid_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it.only('Verify failed login with invalid username and password', () => {
    cy.login(login.invalid_username, login.invalid_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it.only('Verify failed login with empty username', () => {
    cy.login(login.empty_username, login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive(); // verify error username field is visible
  })

  it.only('Verify failed login with empty password', () => {
    cy.login(login.username, login.empty_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it.only('Verify failed login with empty username and password', () => {
    cy.login(login.empty_username, login.empty_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field) // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive();  // verify error username field is visible
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it.only('Verify failed login with username and password swapped', () => {
    cy.login(login.password, login.username);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })

  // Page Object Modeling (POM)

  it('Verify successful login with valid credentials', () => {
    cy.get(loginPage.username).type(login.username);
    cy.get(loginPage.password).type(login.password);
    loginPage.clickLoginButton();
    dashboardPage.verifyDashboardUrl(); // verify dashboard url
    dashboardPage.verifyDashboardTitle(dashboard.dashboard_title); // verify dasshboard title
  })

  it('Verify failed login with invalid username', () => {
    cy.get(loginPage.username).type(login.invalid_username);
    cy.get(loginPage.password).type(login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })

  it('Verify failed login with invalid password', () => {
    cy.get(loginPage.username).type(login.username);
    cy.get(loginPage.password).type(login.invalid_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('Verify failed login with invalid username and password', () => {
    cy.get(loginPage.username).type(login.invalid_username);
    cy.get(loginPage.password).type(login.invalid_password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login) // verify failed message contain text
  })

  it('Verify failed login with empty username', () => {
    cy.get(loginPage.password).type(login.password);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive(); // verify error username field is visible
  })

  it('Verify failed login with empty password', () => {
    cy.get(loginPage.username).type(login.username);
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field); // verify failed message required field
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it('Verify failed login with empty username and password', () => {
    loginPage.clickLoginButton();
    loginPage.verifyMsgRequiredField(login.message.msg_empty_field) // verify failed message required field
    loginPage.verifyErrorUsernameFieldActive();  // verify error username field is visible
    loginPage.verifyErrorPassswordFieldActive(); // verify error password field is visible
  })

  it('Verify failed login with username and password swapped', () => {
    cy.get(loginPage.username).type(login.password);
    cy.get(loginPage.password).type(login.username);
    loginPage.clickLoginButton();
    loginPage.verifyMsgFailedLogin(login.message.msg_failed_login); // verify failed message contain text
  })


})