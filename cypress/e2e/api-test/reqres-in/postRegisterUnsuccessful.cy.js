/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('POST register unsuccesful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            failOnStatusCode: false,
            body: 
            {
                "email": "sydney@fife",
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