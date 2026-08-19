import { test, expect } from '@playwright/test';

test('Verify Booking API Flow', async ({ request }) => {
    let token;
    let bookingId;
    await test.step('Verify Authentication Token', async () => {
        const response = await request.post(
            'https://restful-booker.herokuapp.com/auth',
            {
                data: {
                    username: 'admin',
                    password: 'password123'
                }
            }
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        token = responseBody.token;
        expect(token).toBeTruthy();
    });

    await test.step('Verify Booking Creation', async () => {
        const response = await request.post(
            'https://restful-booker.herokuapp.com/booking',
            {
                data: {
                    firstname: 'Keerthy',
                    lastname: 'Arvind',
                    totalprice: 500,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2026-12-15',
                        checkout: '2026-12-20'
                    },
                }
            }
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        bookingId = responseBody.bookingid;
        expect(bookingId).toBeTruthy();
        expect(responseBody.booking.firstname).toBe('Keerthy');
        expect(responseBody.booking.lastname).toBe('Arvind');
    });

    await test.step('Verify Booking Details', async () => {
        const response = await request.get(
            `https://restful-booker.herokuapp.com/booking/${bookingId}`
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.firstname).toBe('Keerthy');
        expect(responseBody.lastname).toBe('Arvind');
    });

    await test.step('Verify Booking Update', async () => {
        const response = await request.put(
            `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Cookie: `token=${token}`
                },
                data: {
                    firstname: 'UpdatedKeerthy',
                    lastname: 'UpdatedArvind',
                    totalprice: 1000,
                    depositpaid: false,
                    bookingdates: {
                        checkin: '2026-12-15',
                        checkout: '2026-12-25'
                    },
                }
            }
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.firstname).toBe('UpdatedKeerthy');
        expect(responseBody.lastname).toBe('UpdatedArvind');
        expect(responseBody.totalprice).toBe(1000);
    });

    await test.step('Verify Booking Deletion', async () => {
        const response = await request.delete(
            `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`
                }
            }
        );
        expect(response.status()).toBe(201);
    });

    await test.step('Verify Booking Is Deleted', async () => {
        const response = await request.get(
            `https://restful-booker.herokuapp.com/booking/${bookingId}`
        );
        expect(response.status()).toBe(404);
    });
});