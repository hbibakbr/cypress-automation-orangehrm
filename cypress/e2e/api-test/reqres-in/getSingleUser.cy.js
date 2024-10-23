/// <reference types="cypress" />

describe('Reqres API Testing ', () => {
    
    const expectedData = {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    }
    
    it('GET Single User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2'
        }).then((response) => {
            const jsonData = response.body;

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 500ms
            expect(response.duration).to.be.lessThan(500);

            // Test email data is matches
            expect(jsonData.data.email).to.equal('janet.weaver@reqres.in');

            // Test data user with id 2 is valid
            expect(jsonData.data).to.deep.equal(expectedData);
        })
    })
})