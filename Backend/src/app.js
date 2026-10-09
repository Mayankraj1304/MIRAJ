import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
const app = express();

// Built-in middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
// Morgan middleware for logging HTTP requests
app.use(morgan("dev"));

// Cookie parser middleware
app.use(cookieParser());

app.use("/auth", authRouter);

export default app;
