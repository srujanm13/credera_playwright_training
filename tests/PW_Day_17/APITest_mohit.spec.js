import { test, expect } from '@playwright/test';

test('Events CRUD Flow', async ({ request }) => {
  let token;
  let eventId;
  let currentDate = Date.now();

  await test.step('Register user', async () => {
    let response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/auth/register',
      {
        data: {
          email: `testuser${currentDate}@gmail.com`,
          password: 'Password123'
        }
      }
    ); 

    expect(response.status()).toBe(201);
  })

  await test.step('Login', async () => {
    let response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
      {
        data: {
          email: `testuser${currentDate}@gmail.com`,
          password: 'Password123'
        }
      }
    );

    expect(response.status()).toBe(200);

    let responseBody = await response.json();
    token = responseBody.token;

    expect(token).toBeTruthy();
  });

  await test.step('Create Event', async () => {
    let response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          title: `Playwright Event ${Date.now()}`,
          description: 'Created via Playwright',
          category: 'Conference',
          venue: 'Bangalore International Centre',
          city: 'Bangalore',
          eventDate: '2027-12-15T09:00:00.000Z',
          price: 500,
          totalSeats: 100,
          imageUrl: 'https://picsum.photos/500/300'
        }
      }
    );
    expect(response.status()).toBe(201);

    let responseBody = await response.json();
    eventId = responseBody.data.id;
    expect(eventId).toBeTruthy();
    expect(responseBody.data.title).toContain('Playwright Event');
  });

  await test.step('Get Event', async () => {
    let response = await request.get(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
        { headers: {
            Authorization: `Bearer ${token}`
            }
        }
    );

    expect(response.status()).toBe(200);

    let responseBody = await response.json();
    expect(responseBody.data.id).toBe(eventId);
  });

  await test.step('Update Event', async () => {
    let response = await request.put(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          title: 'Updated Playwright Event',
          description: 'Updated via Playwright',
          category: 'Conference',
          venue: 'Bangalore International Centre',
          city: 'Bangalore',
          eventDate: '2027-12-15T09:00:00.000Z',
          price: 500,
          totalSeats: 100,
          imageUrl: 'https://picsum.photos/500/300'
        }
      }
    );

    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    expect(responseBody.data.title).toBe('Updated Playwright Event');
  });

  await test.step('Delete Event', async () => {
    let response = await request.delete(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    expect(response.status()).toBe(200);
  });

  await test.step('Verify Event Deleted', async () => {
    let response = await request.get(
        `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )  
    expect(response.status()).toBe(404);
  });
});