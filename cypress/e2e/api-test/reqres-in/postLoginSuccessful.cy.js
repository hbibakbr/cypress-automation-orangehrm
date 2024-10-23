/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('POST login succesful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: 
            {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test token is existing
            expect(jsonData.token).to.be.exist
        })
    })
})