import { test, expect } from "@playwright/test";

let token;
let eventId;

test.beforeAll(async ({ request }) => {
  const email = `user${Date.now()}@gmail.com`;
  const password = "Password123";
  let response = await request.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/register",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );

  expect(response.status()).toBe(201);

  response = await request.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );

  expect(response.status()).toBe(200);

  let responseBody = await response.json();

  token = responseBody.token;

  expect(token).toBeTruthy();

  response = await request.post(
    "https://api.eventhub.rahulshettyacademy.com/api/events",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: "Playwright Event",
        description: "Created using Playwright",
        category: "Workshop",
        venue: "Chennai Tech Park",
        city: "Chennai",
        eventDate: "2027-12-15T09:00:00.000Z",
        price: 500,
        totalSeats: 50,
        imageUrl: "https://picsum.photos/500/300",
      },
    },
  );

  expect(response.status()).toBe(201);

  responseBody = await response.json();

  eventId = responseBody.data.id;

  expect(eventId).toBeTruthy();
});

test("Get Event", async ({ request }) => {
  const response = await request.get(
    `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.data.id).toBe(eventId);
  expect(responseBody.data.title).toBe("Playwright Event");
});

test("Update Event", async ({ request }) => {

  const response = await request.put(
    `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        title: "Updated Playwright Event",
        description: "Updated using Playwright",
        category: "Workshop",
        venue: "Chennai Tech Park",
        city: "Chennai",
        eventDate: "2027-12-15T09:00:00.000Z",
        price: 750,
        totalSeats: 75,
        imageUrl: "https://picsum.photos/500/300"
      }
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.data.title).toBe("Updated Playwright Event");
  expect(responseBody.data.price).toBe("750");
  expect(responseBody.data.totalSeats).toBe(75);
});

test("Delete and Verify Event", async ({ request }) => {

  let response = await request.delete(
    `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(response.status()).toBe(200);

  response = await request.get(
    `https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log("Status after delete:", response.status());

  expect(response.status()).toBe(404);
});