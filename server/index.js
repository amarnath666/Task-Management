import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Enable credentials (cookies, authorization headers) cross-origin
}));

// Use routes from external modules
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

/* MONGOOSE SETUP */
mongoose
    .connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("MongoDB connected successfully");

}).catch((error) => console.log(` ${error} did not connect`));