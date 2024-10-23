/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('POST login unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            failOnStatusCode: false,
            body: 
            {
                "email": "peter@klaven",
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(400);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test error message is existing
            expect(jsonData.error).to.be.exist

            // Test error message valid
            expect(jsonData.error).to.equal('Missing password')
        })
    })
})