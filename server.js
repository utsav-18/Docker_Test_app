const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 5050;
const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:qwerty@localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB once and reuse
let db;

async function connectDB() {
    if (db) return db;
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db("apnacollege-db");
    return db;
}

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const database = await connectDB();
        const data = await database.collection("users").find({}).toArray();
        res.send(data);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log("Received user:", userObj);

        const database = await connectDB();
        const result = await database.collection("users").insertOne(userObj);
        console.log("Data inserted in DB:", result.insertedId);

        res.status(201).send({ message: "User created successfully", userId: result.insertedId });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).send({ error: "Failed to add user" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});