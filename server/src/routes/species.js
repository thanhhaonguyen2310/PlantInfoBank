import express from "express";
import * as speciesController from "../controllers/species.js";

const router = express.Router();

router.post("/create", speciesController.createSpecies);
router.get("/filter", speciesController.getAllFilterSpecies);
router.get("/get/:id", speciesController.getAllProperty);
router.get("/:id", speciesController.getIdSpecies);
router.get("/all/:id", speciesController.getAllSpecies);

// router.put('/update-user', userController.updateUser)
router.delete('/delete', speciesController.deleteSpecies)
export default router;
