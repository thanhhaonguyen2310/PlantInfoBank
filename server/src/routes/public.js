import express from "express";
import * as speciesController from "../controllers/species.js";

const router = express.Router();

router.post("/kmeans", speciesController.Kmeans);
router.post("/hierarchical", speciesController.Hierarchical);

export default router;
