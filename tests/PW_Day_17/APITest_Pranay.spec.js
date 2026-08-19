import { test, expect } from '@playwright/test';

test('Verifying Booking API Flow', async ({ request }) => {

    const baseURL = 'https://restful-booker.herokuapp.com';

    let token;
    let bookingId;

    await test.step('Verifying Authentication Token', async () => {

        const response = await request.post(`${baseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        token = body.token;

        expect(token).toBeTruthy();
    });

    await test.step('Verifying Booking Creation', async () => {

        const response = await request.post(`${baseURL}/booking`, {
            data: {
                firstname: 'Pranay',
                lastname: 'Dhoble',
                totalprice: 1000,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-09-04',
                    checkout: '2026-09-11'
                }
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        bookingId = body.bookingid;

        expect(bookingId).toBeTruthy();
        expect(body.booking.firstname).toBe('Pranay');
        expect(body.booking.lastname).toBe('Dhoble');
    });

    await test.step('Verifying Booking Details', async () => {

        const response = await request.get(
            `${baseURL}/booking/${bookingId}`
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.firstname).toBe('Pranay');
        expect(body.lastname).toBe('Dhoble');
    });

    await test.step('Verifying Booking Update', async () => {

        const response = await request.put(
            `${baseURL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                    Accept: 'application/json'
                },
                data: {
                    firstname: 'UpdatedPranay',
                    lastname: 'UpdatedDhoble',
                    totalprice: 1000,
                    depositpaid: false,
                    bookingdates: {
                        checkin: '2026-09-04',
                        checkout: '2026-09-11'
                    }
                }
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.firstname).toBe('UpdatedPranay');
        expect(body.lastname).toBe('UpdatedDhoble');
        expect(body.totalprice).toBe(1000);
    });

    await test.step('Verifying Booking Deletion', async () => {

        const response = await request.delete(
            `${baseURL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`
                }
            }
        );

        expect(response.status()).toBe(201);
    });

    await test.step('Verifying Booking Is Deleted', async () => {

        const response = await request.get(
            `${baseURL}/booking/${bookingId}`
        );

        expect(response.status()).toBe(404);
    });
});