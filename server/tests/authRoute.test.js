const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require("../src/models/user.model");
const redisClient = require('../src/utils/redisClient');
require('dotenv');


describe('Auth Routes', () => {
  // Connect to the in-memory database
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await redisClient.connect();
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await redisClient.disconnect();
  });

  // Define test users
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  };

  const testUser2 = {
    username: 'testuser2',
    email: 'testuser2@example.com',
    password: 'password123',
  };

  let userId;

  // Register User Test
  describe('POST auth/register', () => {
    test('should register a new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Registration successful');
    });

    test('should return an error if username or email already exists', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Username or email already exists');
    });
  });

  // Login User Test
  describe('POST auth/login', () => {
    test('should login a user', async () => {
      // Create a test user
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const newUser = new User({
        username: testUser2.username,
        email: testUser2.email,
        password: hashedPassword,
      });
      await newUser.save();

      userId = newUser._id;

      const response = await request(app)
        .post('/auth/login')
        .send({
          username: testUser2.username,
          password: testUser2.password,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
    });

    test('should return an error for invalid username or password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'invalidusername',
          password: 'invalidpassword',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Invalid username or password');
    });
  });

  // Get Token Test
  describe('GET /token/:id', () => {
    test('should get a token for the user', async () => {
      // Create a test user
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const newUser = new User({
        username: testUser.username,
        email: testUser.email,
        password: hashedPassword,
      });
      await newUser.save();

      // Generate a JWT
      const token = jwt.sign({ userId }, process.env.SECRET_KEY);
      await redisClient.set(testUser2.username, token);

      const response = await request(app).get(`/auth/tokens/${testUser2.username}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe(token);
    });

    test('should return an error if no token found', async () => {
      const response = await request(app).get('/auth/tokens/nonexistentuser');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('No token found');
    });
  });
});
