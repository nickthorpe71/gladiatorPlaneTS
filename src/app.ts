import express from "express";
import { fork } from "child_process";
import { createServer } from "http";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import { version } from "../package.json";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

app.get("/", (_, res) =>
  res.send(`Server is up and running version ${version}`)
);

app.get("/isPrime", (req, res) => {
  const incomingNumber = Number(req.query.number);
  logger.info(
    `Request made to check if ${incomingNumber} is prime at ${new Date().toLocaleString()}`
  );

  // process incoming request on its own child process
  const childProcess = fork("src/experiments/parallelism/isPrime.ts");
  childProcess.send({ number: incomingNumber });

  // listen for child process to send message with result from isPrime
  childProcess.on("message", (message) => {
    logger.info(`Request completed at ${new Date().toLocaleString()}`);
    logger.info(`Response: ${JSON.stringify(message)}`);
    res.send(message);
  });
});

httpServer.listen(port, host, () => {
  logger.info(
    `Server version ${version} is listening at http://${host}:${port}`
  );
});
