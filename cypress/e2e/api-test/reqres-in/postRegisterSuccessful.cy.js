/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('POST register succesful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            body: 
            {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test data id is matches
            expect(jsonData.id).to.equal(4)

            // Test token is existing
            expect(jsonData.token).to.be.exist
        })
    })
})