// createImage.controller.ts
import { Request, Response } from "express";
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository'; 
import { Image } from '../../dominio/entities/imageEntity';
const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class CreateImageController {
    static async createImage(req: Request, res: Response): Promise<any> {
        try {
            const { filename } = req.body; // Solo se recibe el nombre del archivo
            const newImage: Image = { id: 0, date: new Date(), filename }; // Se genera la fecha actual aquí

            await imageAppService.createImage(newImage);

            res.status(201).json({
                message: 'La imagen se creó exitosamente',
                data: newImage
            });
        } catch (error) {
            console.log('Hubo un error al crear la imagen', error)
            res.status(500).json({
                error: 'Hubo un error al crear la imagen'
            });
        }
    }
}
