import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router as userRoutes} from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRouter.js";
import {tripRouter} from "./routes/tripRouter.js";

import { bookingRouter } from "./routes/bookingRouter.js";

import connectDB from "./utils/db.js";

const app = express();

// Trust reverse proxy (required for secure cookies and protocol detection on Render)
app.set("trust proxy", 1);

// Body parsers
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS configuration supporting local dev, Vercel preview/production URLs, and configured ORIGIN_ACCESS_URL
const allowedOrigins = process.env.ORIGIN_ACCESS_URL
  ? process.env.ORIGIN_ACCESS_URL.split(",").map((o) => o.trim().replace(/\/+$/, ""))
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/+$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith(".vercel.app") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

const port = process.env.PORT || 8080;

// Root / health-check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy and running" });
});

app.use("/api/v1/rent/users", userRoutes);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)

connectDB();


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
})