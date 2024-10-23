/// <reference types="cypress" />

describe('Reqres API Testing ', () => {

    const expectedData = [
        {
            "id": 1,
            "name": "cerulean",
            "year": 2000,
            "color": "#98B2D1",
            "pantone_value": "15-4020"
        },
        {
            "id": 2,
            "name": "fuchsia rose",
            "year": 2001,
            "color": "#C74375",
            "pantone_value": "17-2031"
        },
        {
            "id": 3,
            "name": "true red",
            "year": 2002,
            "color": "#BF1932",
            "pantone_value": "19-1664"
        },
        {
            "id": 4,
            "name": "aqua sky",
            "year": 2003,
            "color": "#7BC4C4",
            "pantone_value": "14-4811"
        },
        {
            "id": 5,
            "name": "tigerlily",
            "year": 2004,
            "color": "#E2583E",
            "pantone_value": "17-1456"
        },
        {
            "id": 6,
            "name": "blue turquoise",
            "year": 2005,
            "color": "#53B0AE",
            "pantone_value": "15-5217"
        }
    ]

    it('GET List <Resource>', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown',
        }).then((response) => {
            const jsonData = response.body;

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test Total is 12
            expect(jsonData.total).to.equal(12);

            // Test Per page is 6
            expect(jsonData.per_page).to.equal(6);

            // Test data resource is valid
            expect(jsonData.data).to.deep.equal(expectedData);

            // Test Details of resource with id 6 is valid
            const data = jsonData.data.find(u => u.id === 6);
            expect(data.name).to.equal('blue turquoise');
        })
    })
})