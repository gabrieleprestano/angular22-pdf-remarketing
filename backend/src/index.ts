import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";

import pdfBuilderRoutes from "./routes/pdf-builder.routes.js";

const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const API_PREFIX = "/api/v1";

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:4200", // Angular port
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
app.use(helmet());
app.use(express.json());

// Routes
app.use(`${API_PREFIX}/build`, pdfBuilderRoutes);

// Server
app.listen(PORT, () => {
    console.info(`
        message: Server is running on port ${PORT}
        environment: ${process.env.NODE_ENV || "development"}
        api_url: http://localhost:${PORT}${API_PREFIX}`);
});