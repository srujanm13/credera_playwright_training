import { test, expect } from '@playwright/test';

test('API Test', async ({ request }) => {

  let token;
  let eventId;
  let responseBody;

  const email = `automation${Date.now()}@gmail.com`;
  const password = 'Password123';

  // Register User
  await test.step('Register', async () => {
    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/auth/register',
      {
        data: {
          email: email,
          password: password
        }
      }
    );

    expect(response.status()).toBe(201);
  });


  // Login User
  await test.step('Login', async () => {

    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
      {
        data: {
          email: email,
          password: password
        }
      }
    );

    expect(response.status()).toBe(200);
    responseBody = await response.json();
    token = responseBody.token;
    expect(token).toBeTruthy();
  });


  // Create Event
  await test.step('Create Event', async () => {
    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          title: 'Automation Conference',
          description: 'Playwright API Testing',
          category: 'Conference',
          venue: 'Hyderabad International Centre',
          city: 'Hyderabad',
          eventDate: '2027-12-15T09:00:00.000Z',
          price: 600,
          totalSeats: 120,
          imageUrl: 'https://picsum.photos/800/600'
        }
      }
    );
    expect(response.status()).toBe(201);
    responseBody = await response.json();
    eventId = responseBody.data.id;
    expect(eventId).toBeTruthy();
  });


  // Get Event
  await test.step('Get Event Details', async () => {
    const response = await request.get(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    expect(response.status()).toBe(200);
    responseBody = await response.json();
    expect(responseBody.data.id).toBe(eventId);
  });


  // Update Event
  await test.step('Update Event Details', async () => {
    const response = await request.put(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          title: 'Updated Automation Conference',
          description: 'Event details updated',
          category: 'Conference',
          venue: 'Hyderabad Convention Centre',
          city: 'Hyderabad',
          eventDate: '2027-12-15T09:00:00.000Z',
          price: 800,
          totalSeats: 150,
          imageUrl: 'https://picsum.photos/800/600'
        }
      }
    );
    expect(response.status()).toBe(200);
    responseBody = await response.json();
    expect(responseBody.data.title).toBe('Updated Automation Conference');
  });

  // Delete Event
  await test.step('Delete Event', async () => {
    const response = await request.delete(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    expect(response.status()).toBe(200);
  });

  // Verify Event Deleted
  await test.step('Verify Event Deleted', async () => {
    const response = await request.get(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    expect(response.status()).toBe(404);
  });

});