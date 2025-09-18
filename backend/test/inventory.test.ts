
import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { SweetModel } from '../src/models/Sweet';
import { UserModel } from '../src/models/User';
import jwt from 'jsonwebtoken';

let userToken: string, adminToken: string, sweetId: string;

describe('Inventory API', () => {
  beforeAll(async () => {
  await mongoose.connect(process.env.url_mongo||"");
  await SweetModel.deleteMany({});
  await UserModel.deleteMany({});
     const timestamp = Date.now();
     const user = await UserModel.create({ username: `user_${timestamp}`, email: `user_${timestamp}@test.com`, password: 'pass', role: 'user' });
     const admin = await UserModel.create({ username: `admin_${timestamp}`, email: `admin_${timestamp}@test.com`, password: 'pass', role: 'admin' });
     userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
     adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'secret');
     const sweet = await SweetModel.create({ name: 'Rasgulla', category: 'Indian', price: 20, quantity: 5 });
     sweetId = String(sweet._id);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should purchase a sweet and decrease quantity', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(4);
  });

  it('should not purchase if out of stock', async () => {
  await SweetModel.findByIdAndUpdate(sweetId, { quantity: 0 });
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Out of stock');
  });

  it('should restock a sweet (admin only)', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(10);
  });

  it('should forbid restock for non-admin', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ amount: 5 });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Admin access required');
  });
});
