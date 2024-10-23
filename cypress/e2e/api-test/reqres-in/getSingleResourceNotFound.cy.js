/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('GET Single <Resource> Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/23',
            failOnStatusCode: false
        }).then((response) => {

            // Test Status code is 404
            expect(response.status).to.equal(404);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Get response body as string
            const responseBody = JSON.stringify(response.body);

            // Test Response body is empty or "{}"
            expect(responseBody).to.be.oneOf(["", "{}"]);

        })
    })
})