// dataAccess/mysql.image.repository.ts

import { Image } from "../../dominio/entities/imageEntity";
import { ImageRepository } from "../../dominio/repository/imageRepository";
import { query } from '../../../database/db.config';

export class MysqlImageRepository implements ImageRepository {
    async createImage(image: Image): Promise<any> {
        const sql = 'INSERT INTO images (date, filename) VALUES (?, ?)';
        const params = [image.date, image.filename];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al crear la imagen', error);
            throw new Error('Error al crear la imagen' + error);
        }
    }

    async getAllImages(): Promise<Image[]> {
        const sql = 'SELECT id, date, filename FROM images';

        try {
            const [result]: any = await query(sql, []);

            const images: Image[] = result.map((imageData: any) => {
                return {
                    id: imageData.id,
                    date: imageData.date,
                    filename: imageData.filename,
                };
            });
            return images;
        } catch (error) {
            console.log('Error al obtener las imágenes', error);
            throw new Error('Error al obtener las imágenes' + error);
        }
    }

    async getImageById(id: number): Promise<Image | null> {
        const sql = 'SELECT id, date, filename FROM images WHERE id = ?';
        const params = [id];

        try {
            const [result]: any = await query(sql, params);

            if (result.length > 0) {
                const imageData = result[0];
                const image: Image = {
                    id: imageData.id,
                    date: imageData.date,
                    filename: imageData.filename,
                };
                return image;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error al obtener la imagen por ID', error);
            throw new Error('Error al obtener la imagen por ID' + error);
        }
    }

    async updateImage(id: number, image: Image): Promise<any> {
        const sql = 'UPDATE images SET date = ?, filename = ? WHERE id = ?';
        const params = [image.date, image.filename, id];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al actualizar la imagen', error);
            throw new Error('Error al actualizar la imagen' + error);
        }
    }

    async deleteImage(id: number): Promise<any> {
        const sql = 'DELETE FROM images WHERE id = ?';
        const params = [id];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al eliminar la imagen', error);
            throw new Error('Error al eliminar la imagen' + error);
        }
    }
}
