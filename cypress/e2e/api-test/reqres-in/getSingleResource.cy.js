/// <reference types="cypress" />

describe('Reqres API Testing ', () => {

    const expectedData = {
        "id": 2,
        "name": "fuchsia rose",
        "year": 2001,
        "color": "#C74375",
        "pantone_value": "17-2031"
    }

    it('GET Single <Resource>', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/2'
        }).then((response) => {
            const jsonData = response.body;

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test data name is matches
            expect(jsonData.data.name).to.equal('fuchsia rose');


            // Test data resource with id 2 is valid
            expect(jsonData.data).to.deep.equal(expectedData);
        })
    })
})