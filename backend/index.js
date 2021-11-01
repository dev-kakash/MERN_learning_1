const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const uri =
  "mongodb+srv://dev_akash:A03041998@cluster0.awjiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(cors());

app.use(express.json());

const port = 5000;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();

    const database = client.db("foodMaster");
    const userCollection = database.collection("users");
    //GET API
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    //POST API
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      console.log(result);
    });

    //USER API
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("load user", id);
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      console.log("user with id ", result);
      res.send(result);
    });

    //DELETE API
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log("deleting user with id ", result);

      res.json(result);
    });
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Listening........");
});
