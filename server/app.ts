import express from "express";
import morgan from "morgan";
import cors from "cors";
// Express App
export const app = express() as any;

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

//Load Routes
import authRoute from "./routes/auth";
import songRoute from "./routes/song";

// Use Routes
const apiVersion = "/api/v1";

//use routes
app.use(`${apiVersion}/auth`, authRoute);
app.use(`${apiVersion}/song`, songRoute);
