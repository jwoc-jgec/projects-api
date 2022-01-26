// Require the framework and instantiate it
const fastify = require("fastify")({ logger: false });

const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

fastify.register(require("fastify-cors"), {});

// Declare a route
fastify.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// Run the server!
fastify.listen(PORT, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.info(`Server is listening on PORT: ${PORT} ...`);
});
