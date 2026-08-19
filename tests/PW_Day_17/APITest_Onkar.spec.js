import { test, expect } from '@playwright/test';

test('Playwright API Test Flow', async ({ request }) => {
  let token;
  let eventId;
  const currentDate = Date.now();
  const email = `testuser${currentDate}@gmail.com`;
  const password = 'Password123';

  await test.step('user registration' , async () => {
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
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('success');
    expect(responseBody.success).toBe(true);
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user.email).toBe(email);
  });

  await test.step('Login user', async () => {
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
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    token = responseBody.token;
  });

  await test.step('Event Creation', async () => {
    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          title: `Playwright Event ${currentDate}`,
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
    const responseBody = await response.json();
    expect(responseBody.data).toHaveProperty('id');
    eventId = responseBody.data.id;
  
  });

  await test.step('Get event', async () => {
    const response = await request.get(
      `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data.id).toBe(eventId);
    
  });

await test.step('Update event', async () => {
  const response = await request.put(
    `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: 'Updated Playwright Event',
        description: 'Updated via Playwright',
        category: 'Conference',
        venue: 'Bangalore International Centre',
        city: 'Bangalore',
        eventDate: '2027-12-15T09:00:00.000Z',
        price: 600,
        totalSeats: 150,
        imageUrl: 'https://picsum.photos/500/300'
      }
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.data.title).toBe('Updated Playwright Event');
  
  expect(responseBody.data.price).toBe('600');  
  
  
});
    await test.step('Delete event', async () => {
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

  await test.step('Verify event deleted', async () => {
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