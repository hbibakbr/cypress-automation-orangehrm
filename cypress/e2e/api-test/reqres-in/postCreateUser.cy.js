/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('POST create user', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body:
            {
                "name": "Habib Akbar",
                "job": "leader"
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 201
            expect(response.status).to.equal(201);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test id is existing
            expect(jsonData.id).to.be.exist

            // Test Data name is matches
            expect(jsonData.name).to.equal('Habib Akbar');

            // Test data job is macthes
            expect(jsonData.job).to.equal('leader');

        })
    })
})