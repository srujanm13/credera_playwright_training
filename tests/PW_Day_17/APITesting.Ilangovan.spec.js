import { test, expect, request } from '@playwright/test'

let token;
let id;
test.describe.serial('CRUD', () => {
    test.beforeAll('Generate token', async ({ }) => {
        const uniqueusername = `user_${Date.now()}@email.com`;
        const testpassword = 'secret123';
        const apicontext = await request.newContext();
        const response = await apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/register', {
            data: {
                email: uniqueusername,
                password: testpassword
            }
        })
        expect(response.status()).toBe(201);
        const loginresponse = await apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
            data: {
                email: uniqueusername,
                password: testpassword
            }
        })
        expect(loginresponse.status()).toBe(200);
        const loginresponsebody = await loginresponse.json();
        token = loginresponsebody.token;
        await apicontext.dispose();

    })

    test('Create a new event ', async ({ request }) => {
        const eventresponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/events', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                title: 'Tech Summit ',
                description: 'conference',
                category: 'Conference',
                venue: 'Bangalore International Centre',
                city: 'Bangalore',
                eventDate: '2026-12-15T09:00:00.000Z',
                price: 15000,
                totalSeats: 5000,
                imageUrl: 'https://example.com/banner.jpg'
            }
        })
        expect(eventresponse.status()).toBe(201);
        const eventresponsebody = await eventresponse.json();
        id = eventresponsebody.data.id;
    })

    test('Get a single event by ID ', async ({ request }) => {
        const idresponse = await request.get(`https://api.eventhub.rahulshettyacademy.com/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        expect(idresponse.status()).toBe(200);
    })

    test('Update event', async ({ request }) => {
        const eventresponse = await request.put(`https://api.eventhub.rahulshettyacademy.com/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                title: 'Tech Summit ',
                description: 'updated conference',
                category: 'Conference',
                venue: 'Bangalore International Centre',
                city: 'Bangalore',
                eventDate: '2026-12-15T09:00:00.000Z',
                price: 15000,
                totalSeats: 5000,
                imageUrl: 'https://example.com/banner.jpg'
            }
        })
        expect(eventresponse.status()).toBe(200);
        const eventresponsebody = await eventresponse.json();
        expect(eventresponsebody.data.description).toBe('updated conference');
    })

    test('Delete event ', async ({ request }) => {
        const deletedresponse = await request.delete(`https://api.eventhub.rahulshettyacademy.com/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        expect(await deletedresponse.status()).toBe(200);
    })

})

