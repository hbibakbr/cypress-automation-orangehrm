/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('PATCH update user', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            body:
            {
                "name": "Habib Akbar",
                "job": "QA Lead"
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test name is existing
            expect(jsonData.name).to.be.exist

            // Test job is existing
            expect(jsonData.name).to.be.exist

            // Test Data name is matches
            expect(jsonData.name).to.equal('Habib Akbar');

            // Test Data job is matches
            expect(jsonData.job).to.equal('QA Lead');

        })
    })
})