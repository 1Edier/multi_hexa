
import express from 'express';
import { CreateImageController } from '../controller/createimageController';
import { DeleteImageController } from '../controller/deleteImageController';
import { UpdateImageController } from '../controller/editImageController';
import { GetAllImagesController} from '../controller/getImagesController';


export const router = express.Router();

router.post('/', CreateImageController.createImage);
router.delete('/:id', DeleteImageController.deleteImage);
router.put('/:id', UpdateImageController.updateImage);
router.get('/', GetAllImagesController.getAllImages);
export default router;
