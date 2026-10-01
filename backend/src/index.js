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
//express.json
app.use(express.json({limit: "100mb"}));


//urlencoded
app.use(express.urlencoded({limit: "100mb", extended: true}));


//cookie parser
app.use(cookieParser());
//cors
app.use(cors({
  origin: process.env.ORIGIN_ACCESS_URL || "http://localhost:5173",
  credentials: true
}));

const port = process.env.PORT ;
// one test route
app.get ("/", (req, res) => {
  res.send("Hello World");
})

app.use("/api/v1/rent/users", userRoutes);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)

connectDB();


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
})