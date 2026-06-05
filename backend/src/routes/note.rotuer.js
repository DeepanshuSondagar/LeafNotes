import express from "express";
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/note.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getNoteById);
router.post("/",protectRoute, createNote);
router.put("/:id",protectRoute, updateNote);
router.delete("/:id",protectRoute, deleteNote);

export default router;