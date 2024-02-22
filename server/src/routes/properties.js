import express from "express";
import * as propertiesController from '../controllers/properties.js'

const router = express.Router();

router.post('/create', propertiesController.createProperties);
router.post('/add/excel/:id', propertiesController.addSpeciesExcel);
router.post('/add/:id', propertiesController.addSpecies);
router.get('/all/:id', propertiesController.getProperty);
// router.put('/update-user', userController.updateUser)
// router.delete('/delete-user', userController.deleteUser)
export default router;