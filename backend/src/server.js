import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";

// Load .env from current working directory first.
dotenv.config();

// If running with cwd set to `backend/src` (common during development),
// process.env may still be undefined for variables in the backend/.env file.
// Attempt to load the parent `.env` (backend/.env) as a fallback.
if (!process.env.MONGODB_URI) {
    const parentEnv = path.resolve(process.cwd(), '../.env');
    dotenv.config({ path: parentEnv });
}

import express from "express";
import authRouter from "./routes/auth.router.js";
import noteRouter from "./routes/note.rotuer.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}


app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
    connectDB();
});