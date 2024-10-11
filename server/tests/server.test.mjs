// server.test.js
import request from 'supertest';
import app from './server.mjs';

test('GET /api responds with json', async () => {
  const response = await request(app).get('/api');
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Hello World');
});
