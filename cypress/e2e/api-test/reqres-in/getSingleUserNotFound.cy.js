/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('GET Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false // Failure status code pass
        }).then((response) => {
            // Test Status code is 200
            expect(response.status).to.equal(404);

            // Test Response time is less than 500ms
            expect(response.duration).to.be.lessThan(500);

            // Get response body as string
            const responseBody = JSON.stringify(response.body);

            // Test Response body is empty or "{}"
            expect(responseBody).to.be.oneOf(["", "{}"]);
        })
    })
})