class LoginPage {
    username = 'input[name="username"]';
    password = 'input[name="password"]';
    btnLogin = 'button[type="submit"]';
    msgFailedLogin = 'p[class*="oxd-alert-content-text"]';
    msgRequiredField = 'span[class*="oxd-input-field-error-message"]';

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
}

export default new LoginPage();