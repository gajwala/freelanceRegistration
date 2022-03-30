import express from "express";
const router = express.Router();

import { config, signup, getConfig } from "../controllers/user.js";

router.post("/config", config);
router.post("/signup", signup);
router.get("/config", getConfig);

export default router;
