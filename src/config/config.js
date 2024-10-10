import dotenv from "dotenv";

import program from "../utils/commander.js";
const { mode } = program.opts();

dotenv.config({
  path: mode === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});

const configObject = {
  mongo_url: process.env.MONGO_URL,
};

export default configObject;

// const environment = "DEVELOPMENT";
// dotenv.config({
//   path:
//     environment === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
// });

// export default {
//   PORT: process.env.PORT,
//   MONGO_URL: process.env.MONGO_URL,
//   ADMIN_EMAIL: process.env.ADMIN_EMAIL,
//   ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
//   JWT_SECRET: process.env.JWT_SECRET,
//   PERSISTENCE: process.env.PERSISTENCE,
//   EMAIL_USER: process.env.EMAIL_USER,
//   EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
//   NODE_ENV: environment,
// };
