import express from "express";
import { createServer } from "http";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import { version } from "../package.json";

import isPrime from "./experiments/parallelism/isPrime";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

app.get("/", (_, res) =>
  res.send(`Server is up and running version ${version}`)
);

app.get("/isprime", (req, res) => {
  const incomingNumber = Number(req.query.number);
  logger.info(
    `Request made to check if ${incomingNumber} is prime at ${new Date().toLocaleString()}`
  );

  const jsonResponse = isPrime(incomingNumber);
  logger.info(`Request completed at ${new Date().toLocaleString()}`);
  logger.info(`Response: ${JSON.stringify(jsonResponse)}`);

  res.send(jsonResponse);
});

httpServer.listen(port, host, () => {
  logger.info(`Server version ${version} is listening`);
  logger.info(`http://${host}:${port}`);
});
