import '../../../../support/commands'
import LoginPage from '../../../../support/pages/orangeHrm/login.page';
require('cypress-xpath');

describe('Funtional Login Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.url().should('include', '/auth/login');
  });

  // Custom Commands

  it.only('Verify successful login with valid credentials', () => {
    cy.login('Admin', 'admin123');
    cy.xpath('//button[@type="submit"]').click();
    cy.url().should('include', '/dashboard/index'); // verify dashboard
  })

  it('Verify failed login with invalid username', () => {
    cy.login('invalid_Admin', 'admin123');
    cy.xpath('//button[@type="submit"]').click();
    cy.msgFailedLogin('Invalid credentials'); // verify failed message contain text
  })

  it('Verify failed login with invalid password', () => {
    cy.login('Admin', 'invalid_admin123');
    cy.get('button[type="submit"]').click();
    cy.msgFailedLogin('Invalid credentials'); // verify failed message contain text
  })

  it('Verify failed login with invalid username and password', () => {
    cy.login('invalid_Admin', 'invalid_admin123');
    cy.get('button[type="submit"]').click();
    cy.msgFailedLogin('Invalid credentials'); // verify failed message contain text
  })

  it('Verify failed login with empty username', () => {
    cy.login(' ', 'invalid_admin123');
    cy.get('button[type="submit"]').click();
    cy.msgRequiredField('Required'); // verify failed message required field
  })

  it('Verify failed login with empty password', () => {
    cy.login('invalid_Admin', ' ');
    cy.get('button[type="submit"]').click();
    cy.msgRequiredField('Required'); // verify failed message required field
  })

  it('Verify failed login with empty username and password', () => {
    cy.login('invalid_Admin', ' ');
    cy.get('button[type="submit"]').click();
    cy.msgRequiredField('Required'); // verify failed message required field
  })

  // Page Object Modeling (POM)

  it('Pengguna gagal login dengan username yang salah', () => {
    cy.get(LoginPage.username).type('invalid_Admin');
    cy.get(LoginPage.password).type('admin123');
    LoginPage.clickLoginButton();
    LoginPage.verifyMsgFailedLogin('Invalid credentials') // verify failed message contain text
  })

  it('Pengguna gagal login dengan password yang salah', () => {
    cy.get(LoginPage.username).type('Admin');
    cy.get(LoginPage.password).type('invalid_admin123');
    LoginPage.clickLoginButton();
    LoginPage.verifyMsgFailedLogin('Invalid credentials') // verify failed message contain text
  })

  it('Pengguna gagal login dengan username dan password yang salah', () => {
    cy.get(LoginPage.username).type('invalid_Admin');
    cy.get(LoginPage.password).type('invalid_admin123');
    LoginPage.clickLoginButton();
    LoginPage.verifyMsgFailedLogin('Invalid credentials') // verify failed message contain text
  })

  it.only('Pengguna gagal login dengan username kosong', () => {
    cy.get(LoginPage.username).type(' ');
    cy.get(LoginPage.password).type('admin123');
    LoginPage.clickLoginButton();
    LoginPage.verifyMsgRequiredField('Required') // verify failed message required field
  })

  it('Pengguna gagal login dengan password kosong', () => {
    cy.get(LoginPage.username).type(' ');
    cy.get(LoginPage.password).type('admin123');
    LoginPage.clickLoginButton();
    LoginPage.verifyMsgRequiredField('Required') // verify failed message required field
  })

})