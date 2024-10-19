require('cypress-xpath');

class DashboardPage {
    
    url = 'dashboard/index';
    dashboardTitle = '//h6[text()="Dashboard"]'

    verifyDashboardUrl () {
        cy.url().should('include', this.url);
    }

    verifyDashboardTitle (message) {
        cy.xpath(this.dashboardTitle).should('have.text', message);
    }
}

export default new DashboardPage();