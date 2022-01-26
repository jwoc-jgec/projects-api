// Require the framework and instantiate it
const fastify = require("fastify")({ logger: false });
const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

fastify.register(require("fastify-cors"), {});

const client = new MongoClient(MONGODB_URL);

// Declare a route
fastify.get("/", async (req, res) => {
  const db = client.db("jwoc");
  const collection = db.collection("mentors");
  const selectedMentors = await collection
    .find({ isSelected: true })
    .project({
      name: 1,
      email: 1,
      github: 1,
      linkedIn: 1,
      projectName: 1,
      projectLink: 1,
      projectTags: 1,
      projectDescription: 1,
      _id: 0,
    })
    .toArray();
  res.send(selectedMentors);
});

// Connect the DB and Run the server!

client
  .connect()
  .then(() => startServer())
  .catch((error) => console.log(error.message));

const startServer = async () => {
  try {
    await fastify.listen(PORT);
    console.info(`Server is listening on PORT: ${PORT} ...`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
