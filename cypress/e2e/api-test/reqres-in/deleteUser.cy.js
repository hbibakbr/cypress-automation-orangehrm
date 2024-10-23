/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    it('DELETE User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/user/2'
        }).then((response) => {

            // Test Status code is 204
            expect(response.status).to.equal(204);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test Content-Type header is empty
            expect(response.headers).to.not.have.property('content-type');
        })
    })
})