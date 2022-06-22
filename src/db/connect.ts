import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

async function connect() {
  const dbUri = config.get("dbUri") as string;

  try {
    const connection = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("Database connected");

    return connection;
  } catch (error) {
    logger.error(`db error ${error}`);
    process.exit(1); // exit process with a failure
  }
}

export default connect;
