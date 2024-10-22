class LoginPage {

    static inputUsername () { // static version
        return cy.get('input[name="username"]');
    }

    static inputPassword () {
        return cy.get('input[name="password"]');
    }

    static clickLoginButton () {
        return cy.get('button[type="submit"]').click()
    }

    static verifyExistMsgFailedLogin () {
        return cy.get('p[class*="oxd-alert-content-text"]').should('exist')
    }

    static verifyTextMsgFailedLogin (message) {
        return cy.get('p[class*="oxd-alert-content-text"]').should('contain.text', message)
    }

    static verifyExistMsgRequiredField () {
        return cy.get('span[class*="oxd-input-field-error-message"]').should('exist')
    }

    static verifyTextMsgRequiredField (message) {
        return cy.get('span[class*="oxd-input-field-error-message"]').should('contain.text', message)
    }

    static verifyErrorUsernameFieldActive () {
        return cy.get('input.oxd-input.oxd-input--active.oxd-input--error[name="username"]').should('be.visible')
    }

    static verifyErrorPassswordFieldActive () {
        return cy.get('input.oxd-input.oxd-input--active.oxd-input--error[name="password"]').should('be.visible')
    }
}

export default LoginPage;