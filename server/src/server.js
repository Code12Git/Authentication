import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./db/conn.js";
import userRoute from "./routes/user.routes.js";

const app = express();
dotenv.config({ path: "./config.env" });

// Importing the database connection
connection();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/auth", userRoute);

app.listen(PORT, () => {
  console.log("🚀 Server listening on PORT: " + PORT);
});
