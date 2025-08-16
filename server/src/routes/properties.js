import express from "express";
import * as propertiesController from "../controllers/properties.js";

const router = express.Router();

router.post("/create", propertiesController.createProperties);
router.post("/add/excel/:id", propertiesController.addSpeciesExcel);
router.post("/add/:id", propertiesController.addSpecies);
router.get("/all/:id", propertiesController.getProperty);
router.get("/genus/:id", propertiesController.getPropertyGenus);
router.get("/get/:id", propertiesController.getPropertyID);
router.post("/column", propertiesController.getPropertyColumn);
router.put('/update', propertiesController.updateProperty)
router.delete('/delete', propertiesController.deleteProperty)
export default router;
