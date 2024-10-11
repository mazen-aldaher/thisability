import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import User from "../models/User.js";

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use("/api/user", registerUser, loginUser, getUserProfile);

describe("User Routes", () => {
  beforeAll(() => {
    // Mock the JWT_SECRET environment variable
    process.env.JWT_SECRET = "testsecret"; // Replace with any secret for testing
  });
  describe("User Routes", () => {
    let findOneSpy;
    let createSpy;
    let findByIdSpy;

    beforeEach(() => {
      // Reset spies before each test
      findOneSpy = spyOn(User, "findOne");
      createSpy = spyOn(User, "create");
      findByIdSpy = spyOn(User, "findById");
    });

    afterEach(() => {
      // Clear any modifications after each test
      findOneSpy.and.callThrough();
      createSpy.and.callThrough();
      findByIdSpy.and.callThrough();
    });

    describe("POST /api/user/register", () => {
      it("should register a new user", async (done) => {
        const newUser = {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "artist",
        };

        findOneSpy.and.returnValue(Promise.resolve(null)); // Simulate user not existing
        createSpy.and.returnValue(Promise.resolve(newUser)); // Simulate user creation

        const response = await request(app)
          .post("/api/user/register")
          .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(User.findOne).toHaveBeenCalledWith({ email: newUser.email });
        expect(User.create).toHaveBeenCalledWith(
          jasmine.objectContaining(newUser)
        );
        done();
      });

      it("should return 400 if user already exists", async (done) => {
        const existingUser = {
          username: "existinguser",
          email: "test@example.com",
          password: "password123",
          role: "artist",
        };

        findOneSpy.and.returnValue(Promise.resolve(existingUser)); // Simulate user existing

        const response = await request(app)
          .post("/api/user/register")
          .send(existingUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists");
        done();
      });
    });

    describe("POST /api/user/login", () => {
      it("should log in an existing user", async (done) => {
        const loginUserDetails = {
          email: "test@example.com",
          password: "password123",
        };

        const mockUser = {
          _id: "12345",
          username: "testuser",
          email: "test@example.com",
          role: "artist",
          matchPassword: () => Promise.resolve(true), // Mock matchPassword to return true
        };

        findOneSpy.and.returnValue(Promise.resolve(mockUser)); // Simulate finding the user

        const response = await request(app)
          .post("/api/user/login")
          .send(loginUserDetails);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(User.findOne).toHaveBeenCalledWith({
          email: loginUserDetails.email,
        });
        done();
      });

      it("should return 401 for invalid credentials", async (done) => {
        const loginUserDetails = {
          email: "test@example.com",
          password: "wrongpassword",
        };

        const mockUser = {
          _id: "12345",
          username: "testuser",
          email: "test@example.com",
          role: "artist",
          matchPassword: () => Promise.resolve(false), // Mock matchPassword to return false
        };

        findOneSpy.and.returnValue(Promise.resolve(mockUser)); // Simulate finding the user

        const response = await request(app)
          .post("/api/user/login")
          .send(loginUserDetails);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid email or password");
        done();
      });
    });

    describe("GET /api/user/profile", () => {
      it("should return user profile", async (done) => {
        const mockUser = {
          _id: "12345",
          username: "testuser",
          email: "test@example.com",
          role: "artist",
        };

        const token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET); // Create a valid token
        findByIdSpy.and.returnValue(Promise.resolve(mockUser)); // Simulate finding the user by ID

        const response = await request(app)
          .get("/api/user/profile")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(jasmine.objectContaining(mockUser));
        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        done();
      });

      it("should return 404 if user not found", async (done) => {
        const token = jwt.sign({ id: "nonexistentid" }, process.env.JWT_SECRET); // Create a valid token

        findByIdSpy.and.returnValue(Promise.resolve(null)); // Simulate user not found

        const response = await request(app)
          .get("/api/user/profile")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
        done();
      });
    });
  });
});
