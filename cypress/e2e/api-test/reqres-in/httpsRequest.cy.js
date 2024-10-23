/// <reference types="cypress" />

describe('Reqres API Testing', () => {
    it('GET List User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=2'
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

            // Test Data users is valid
            const expectedData = [
                {
                    "id": 7,
                    "email": "michael.lawson@reqres.in",
                    "first_name": "Michael",
                    "last_name": "Lawson",
                    "avatar": "https://reqres.in/img/faces/7-image.jpg"
                },
                {
                    "id": 8,
                    "email": "lindsay.ferguson@reqres.in",
                    "first_name": "Lindsay",
                    "last_name": "Ferguson",
                    "avatar": "https://reqres.in/img/faces/8-image.jpg"
                },
                {
                    "id": 9,
                    "email": "tobias.funke@reqres.in",
                    "first_name": "Tobias",
                    "last_name": "Funke",
                    "avatar": "https://reqres.in/img/faces/9-image.jpg"
                },
                {
                    "id": 10,
                    "email": "byron.fields@reqres.in",
                    "first_name": "Byron",
                    "last_name": "Fields",
                    "avatar": "https://reqres.in/img/faces/10-image.jpg"
                },
                {
                    "id": 11,
                    "email": "george.edwards@reqres.in",
                    "first_name": "George",
                    "last_name": "Edwards",
                    "avatar": "https://reqres.in/img/faces/11-image.jpg"
                },
                {
                    "id": 12,
                    "email": "rachel.howell@reqres.in",
                    "first_name": "Rachel",
                    "last_name": "Howell",
                    "avatar": "https://reqres.in/img/faces/12-image.jpg"
                }
            ];
            expect(jsonData.data).to.deep.equal(expectedData);

            // Test Details of user with id 7 is valid
            const user = jsonData.data.find(u => u.id === 7);
            expect(user.email).to.equal("michael.lawson@reqres.in");
            expect(user.first_name).to.equal("Michael");
            expect(user.last_name).to.equal("Lawson");
        })
    })

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
            const expectedData = {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            }

            expect(jsonData.data).to.deep.equal(expectedData);
        })
    })

    it('GET Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false // Failure status code pass
        }).then((response) => {
            // Test Status code is 200
            expect(response.status).to.equal(404);

            // Test Response time is less than 500ms
            expect(response.duration).to.be.lessThan(500);

            // Get response body as string
            const responseBody = JSON.stringify(response.body);

            // Test Response body is empty or "{}"
            expect(responseBody).to.be.oneOf(["", "{}"]);
        })
    })

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

            expect(jsonData.data).to.deep.equal(expectedData);

            // Test Details of resource with id 6 is valid
            const data = jsonData.data.find(u => u.id === 6);
            expect(data.name).to.equal('blue turquoise');
        })
    })

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
            const expectedData = {
                "id": 2,
                "name": "fuchsia rose",
                "year": 2001,
                "color": "#C74375",
                "pantone_value": "17-2031"
            }
            expect(jsonData.data).to.deep.equal(expectedData);
        })
    })

    it('GET Single <Resource> Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/23',
            failOnStatusCode: false
        }).then((response) => {

            // Test Status code is 404
            expect(response.status).to.equal(404);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Get response body as string
            const responseBody = JSON.stringify(response.body);

            // Test Response body is empty or "{}"
            expect(responseBody).to.be.oneOf(["", "{}"]);

        })
    })

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

    it('PUT update user', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            body:
            {
                "name": "Habib Akbar",
                "job": "zion resident"
            }
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(700);

            // Test name is existing
            expect(jsonData.name).to.be.exist

            // Test Data name is matches
            expect(jsonData.name).to.equal('Habib Akbar');


        })
    })

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
    
    it('GET delayed response', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3',
        }).then((response) => {
            const jsonData = response.body

            // Test Status code is 200
            expect(response.status).to.equal(200);

            // Test Response time is less than 700ms
            expect(response.duration).to.be.lessThan(5000);

            // Test Data users is valid
            const expectedData = [
                {
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                },
                {
                    "id": 2,
                    "email": "janet.weaver@reqres.in",
                    "first_name": "Janet",
                    "last_name": "Weaver",
                    "avatar": "https://reqres.in/img/faces/2-image.jpg"
                },
                {
                    "id": 3,
                    "email": "emma.wong@reqres.in",
                    "first_name": "Emma",
                    "last_name": "Wong",
                    "avatar": "https://reqres.in/img/faces/3-image.jpg"
                },
                {
                    "id": 4,
                    "email": "eve.holt@reqres.in",
                    "first_name": "Eve",
                    "last_name": "Holt",
                    "avatar": "https://reqres.in/img/faces/4-image.jpg"
                },
                {
                    "id": 5,
                    "email": "charles.morris@reqres.in",
                    "first_name": "Charles",
                    "last_name": "Morris",
                    "avatar": "https://reqres.in/img/faces/5-image.jpg"
                },
                {
                    "id": 6,
                    "email": "tracey.ramos@reqres.in",
                    "first_name": "Tracey",
                    "last_name": "Ramos",
                    "avatar": "https://reqres.in/img/faces/6-image.jpg"
                }
            ];
            expect(jsonData.data).to.deep.equal(expectedData);
        })
    })
})