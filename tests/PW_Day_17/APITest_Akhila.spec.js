import { test, expect } from '@playwright/test';

test('EventHub CRUD Operations', async ({ request }) => {

    let authToken;
    let createdEventId;

    const userEmail = `akhila${Date.now()}@gmail.com`;
    const userPassword = 'Password123';

    await test.step('Register New User', async () => {

        const registerResponse = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/register',
            {
                data: {
                    email: userEmail,
                    password: userPassword
                }
            }
        );

        expect(registerResponse.status()).toBe(201);
    });

    
    await test.step('Login User', async () => {

        const loginResponse = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: {
                    email: userEmail,
                    password: userPassword
                }
            }
        );

        expect(loginResponse.status()).toBe(200);

        const loginBody = await loginResponse.json();
        authToken = loginBody.token;

        expect(authToken).toBeTruthy();
    });


    await test.step('Create Event', async () => {

        const createResponse = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/events',
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: {
                    title: 'Playwright Workshop',
                    description: 'Learning API Automation',
                    category: 'Workshop',
                    venue: 'Hitech City',
                    city: 'Hyderabad',
                    eventDate: '2027-08-20T09:00:00.000Z',
                    price: 700,
                    totalSeats: 100,
                    imageUrl: 'https://picsum.photos/500/500'
                }
            }
        );

        expect(createResponse.status()).toBe(201);

        const createBody = await createResponse.json();
        createdEventId = createBody.data.id;

        expect(createdEventId).toBeTruthy();
    });

   
    await test.step('Fetch Event Details', async () => {

        const getResponse = await request.get(
            `https://api.eventhub.rahulshettyacademy.com/api/events/${createdEventId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        expect(getBody.data.id).toBe(createdEventId);
        expect(getBody.data.title).toBe('Playwright Workshop');
    });


    await test.step('Update Event', async () => {

        const updateResponse = await request.put(
            `https://api.eventhub.rahulshettyacademy.com/api/events/${createdEventId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: {
                    title: 'Advanced Playwright Workshop',
                    description: 'Updated API Testing Session',
                    category: 'Workshop',
                    venue: 'Cyber Towers',
                    city: 'Hyderabad',
                    eventDate: '2027-08-20T09:00:00.000Z',
                    price: 900,
                    totalSeats: 150,
                    imageUrl: 'https://picsum.photos/500/500'
                }
            }
        );

        expect(updateResponse.status()).toBe(200);

        const updateBody = await updateResponse.json();

        expect(updateBody.data.title).toBe('Advanced Playwright Workshop');
    });


    await test.step('Delete Event', async () => {

        const deleteResponse = await request.delete(
            `https://api.eventhub.rahulshettyacademy.com/api/events/${createdEventId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        expect(deleteResponse.status()).toBe(200);
    });

    await test.step('Verify Event Deleted', async () => {

        const verifyResponse = await request.get(
            `https://api.eventhub.rahulshettyacademy.com/api/events/${createdEventId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        expect(verifyResponse.status()).toBe(404);
    });

});