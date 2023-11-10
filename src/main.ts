import "dotenv/config";
import mongoose from "mongoose";

import DI from "./DI";
import config from "./config";
import Application from "./providers/Application";
import authRoute from "./routes/auth";
import customersRoute from "./routes/customers";

async function bootstrap() {
  await mongoose.connect(config.DATABASE_URL);
  DI.logger.log("info", "> Connected to the database.");

  const app = new Application();

  authRoute(app);
  customersRoute(app)

  await app.listen();
}

bootstrap();
