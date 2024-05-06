import express from "express";
import * as speciesController from "../controllers/genus.js";

const router = express.Router();

router.post("/create", speciesController.createGenus);
router.get("/all", speciesController.getAllGenus);
router.put("/update", speciesController.updateGenus);
router.delete("/delete", speciesController.deleteGenus);
export default router;
