class LoginPage {
    username = 'input[name="username"]';
    password = 'input[name="password"]';
    btnLogin = 'button[type="submit"]';
    msgFailedLogin = 'p[class*="oxd-alert-content-text"]';
    msgRequiredField = 'span[class*="oxd-input-field-error-message"]';
    errorFieldActiveUsername = 'input.oxd-input.oxd-input--active.oxd-input--error[name="username"]';
    errorFieldActivePassword = 'input.oxd-input.oxd-input--active.oxd-input--error[name="password"]';

    /* static inputUsername () { // static version
        return cy.get('input[name="username"]');
    } */

    /* inputPassword () {
        return cy.get('input[name="password"]');
    } */

    clickLoginButton () {
        cy.get('button[type="submit"]').click()
    }

    verifyMsgFailedLogin (message) {
        cy.get(this.msgFailedLogin).should('exist', message)
        cy.get(this.msgFailedLogin).should('contain.text', message)
    }

    verifyMsgRequiredField (message) {
        cy.get(this.msgRequiredField).should('exist', message)
        cy.get(this.msgRequiredField).should('contain.text', message)
    }

    verifyErrorUsernameFieldActive () {
        cy.get(this.errorFieldActiveUsername).should('be.visible')
    }

    verifyErrorPassswordFieldActive () {
        cy.get(this.errorFieldActivePassword).should('be.visible')
    }
}

export default new LoginPage();
// export default LoginPage;