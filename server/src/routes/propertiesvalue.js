import express from "express";
import * as propertiesvalueController from '../controllers/propertiesvalue.js'

const router = express.Router();

router.post('/create', propertiesvalueController.createPropertiesValue);
// router.post('/login', userController.login);
// router.get('/all', userController.getUser);
router.put('/update', propertiesvalueController.updateProperty)
router.delete('/delete', propertiesvalueController.deleteProperty)
export default router;