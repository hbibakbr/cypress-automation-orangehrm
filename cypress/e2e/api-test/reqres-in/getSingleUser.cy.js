/// <reference types="cypress" />

describe('Reqres API Testing - Get Single User', () => {
    it('get list user', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data.id).to.equal(2);
        })
    })
})