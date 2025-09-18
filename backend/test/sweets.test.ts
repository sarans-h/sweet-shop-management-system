import request from 'supertest';
import app from '../src/app';
const mongoose = require('mongoose');
const { SweetModel } = require('../src/models/Sweet');
const { UserModel } = require('../src/models/User');
const jwt = require('jsonwebtoken');

let adminToken: string;

describe('Sweets API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.url_mongo);
  await SweetModel.deleteMany({});
  await UserModel.deleteMany({});
    // Create admin user and get token
  const admin = await UserModel.create({ username: 'admin', email: 'admin@test.com', password: 'pass', role: 'admin' });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'secret');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  it('should create a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ladoo', category: 'Indian', price: 10, quantity: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Ladoo');
  });

  it('should get all sweets', async () => {
  await SweetModel.create({ name: 'Barfi', category: 'Indian', price: 15, quantity: 50 });
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it('should search sweets by name', async () => {
    // Ensure the sweet exists before searching
    await SweetModel.create({ name: 'Ladoo', category: 'Indian', price: 10, quantity: 100 });
    const res = await request(app).get('/api/sweets/search?name=Ladoo');
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty('name', 'Ladoo');
  });

  it('should update a sweet', async () => {
  const sweet = await SweetModel.create({ name: 'Jalebi', category: 'Indian', price: 20, quantity: 30 });
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 25 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('price', 25);
  });

  it('should delete a sweet (admin only)', async () => {
  const sweet = await SweetModel.create({ name: 'Halwa', category: 'Indian', price: 12, quantity: 40 });
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Sweet deleted');
  });
});
