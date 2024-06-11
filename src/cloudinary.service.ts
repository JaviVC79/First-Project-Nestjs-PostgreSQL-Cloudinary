import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_api_key,
  CLOUDINARY_api_secret,
  CLOUDINARY_cloud_name,
} from 'src/users/constants';
import * as fs from 'fs';
import { CloudinaryResponseDto } from './dto/cloudinary-response.dto';

cloudinary.config({
  cloud_name: CLOUDINARY_cloud_name,
  api_key: CLOUDINARY_api_key,
  api_secret: CLOUDINARY_api_secret,
});

export interface Image {
  file: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  async uploadImage(image: Image) {
    try {
      const { file, public_id } = image;
      const response = await cloudinary.uploader.upload(
        file,
        {
          public_id,
          folder: 'TasksNestjsReact',
          resource_type: 'image',
        },
        function (error, result) {
          console.log(result);

          // Elimina el archivo del almacenamiento local después de subirlo
          fs.unlink(file, (err) => {
            if (err) {
              console.error(`Error al eliminar el archivo: ${err}`);
            } else {
              console.log(`Archivo eliminado correctamente: ${file}`);
            }
          });
        },
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  async getImageByFilename(filename: string) {
    const response = await cloudinary.search
      .expression(`filename = ${filename}`)
      .execute();
    const resources: CloudinaryResponseDto[] = response.resources;
    if (response.total_count > 0) {
      return resources.map((elem: CloudinaryResponseDto) => elem.secure_url);
    }
  }
}
