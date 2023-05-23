const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ChatRoom = require('../src/models/chatRoom.model');
const app = require('../app');


describe('Chat Room API', () => {
    let mongoServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Close the database connection after all tests
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    // Clear the database and reseed before each test
    beforeEach(async () => {
        await ChatRoom.deleteMany();
    });

    describe('POST /api/chatRooms', () => {
        it('should create a new chat room', async () => {
            const roomName = 'Test Room';

            // Send a POST request to create a new chat room
            const response = await request(app)
                .post('/api/chatRooms')
                .send({ roomName })
                .expect(201);

            // Assert that the chat room was created successfully
            expect(response.body).toEqual(roomName);
        });

        it('should return 409 if chat room already exists', async () => {
            const roomName = 'Existing Room';

            // Create an existing chat room in the database
            await ChatRoom.create({ roomName });

            // Send a POST request to create the existing chat room
            const response = await request(app)
                .post('/api/chatRooms')
                .send({ roomName })
                .expect(409);

            // Assert that the response has the correct status code
            expect(response.body.message).toEqual('Chat room already exists');
        });
    });

    describe('GET /api/chatRooms', () => {
        it('should return a list of chat room names', async () => {
            const roomNames = ['Room 1', 'Room 2', 'Room 3'];

            // Create multiple chat rooms in the database
            await ChatRoom.create([
                { roomName: roomNames[0] },
                { roomName: roomNames[1] },
                { roomName: roomNames[2] },
            ]);

            // Send a GET request to retrieve the chat room names
            const response = await request(app)
                .get('/api/chatRooms')
                .expect(200);

            // Assert that the response contains the expected chat room names
            expect(response.body).toEqual(roomNames);
        });
    });
});