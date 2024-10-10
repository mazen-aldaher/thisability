import request from 'supertest';  // Import supertest
import mongoose from 'mongoose';
import User from '../models/User.js';
import server from '../server.js';  // Ensure this points to your main server setup file

describe('User Controller', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
    server.close();  // Close the server after tests
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', (done) => {
      request(server)
        .post('/api/users/register')
        .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123', role: 'user' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('_id');
          expect(res.body).toHaveProperty('username', 'testuser');
          expect(res.body).toHaveProperty('email', 'testuser@example.com');
          expect(res.body).toHaveProperty('role', 'user');
          expect(res.body).toHaveProperty('token');
          done();
        });
    });

    it('should not register a user with an existing email', (done) => {
      request(server)
        .post('/api/users/register')
        .send({ username: 'testuser2', email: 'testuser@example.com', password: 'password123', role: 'user' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty('message', 'User already exists');
          done();
        });
    });
  });

  describe('POST /api/users/login', () => {
    it('should authenticate an existing user and return a token', (done) => {
      request(server)
        .post('/api/users/login')
        .send({ email: 'testuser@example.com', password: 'password123' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('token');
          done();
        });
    });

    it('should not authenticate with wrong password', (done) => {
      request(server)
        .post('/api/users/login')
        .send({ email: 'testuser@example.com', password: 'wrongpassword' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty('message', 'Invalid email or password');
          done();
        });
    });

    it('should not authenticate non-existent user', (done) => {
      request(server)
        .post('/api/users/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty('message', 'Invalid email or password');
          done();
        });
    });
  });
});
