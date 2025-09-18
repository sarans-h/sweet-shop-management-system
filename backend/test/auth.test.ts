const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Authentication', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.url_mongo);
    // await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test22@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser2', email: 'test22@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test22@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
