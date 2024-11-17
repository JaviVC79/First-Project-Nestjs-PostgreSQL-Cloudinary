import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_api_key,
  CLOUDINARY_api_secret,
  CLOUDINARY_cloud_name,
} from 'src/users/constants';
import * as fs from 'fs';
import { CloudinaryResponseDto } from '../dto/cloudinary-response.dto';
import { TasksService } from '../tasks/tasks.service';

cloudinary.config({
  cloud_name: CLOUDINARY_cloud_name,
  api_key: CLOUDINARY_api_key,
  api_secret: CLOUDINARY_api_secret,
});

export interface Image {
  file: string;
  id: string;
}

@Injectable()
export class CloudinaryService {
  constructor(private taskService: TasksService) { }
  async uploadImage(image: Image, userEmail: string) {
    try {
      const { file, id } = image;
      const response = await cloudinary.uploader.upload(
        file,
        {
          public_id: id,
          folder: `TasksNestjsReact/${userEmail}`,
          resource_type: 'image',
        },
        function (error, result) {
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
      const secure_url = response.secure_url;
      await this.taskService.createTaskImage({ secure_url, id });
      return response;
    } catch (e) {
      return e;
    }
  }

  async getImageByFilename(filename: string) {
    try {
      const response = await cloudinary.search
        .expression(`filename = ${filename}`)
        .execute();
      const resources: CloudinaryResponseDto[] = response.resources;
      if (response.total_count > 0) {
        return resources.map((elem: CloudinaryResponseDto) => elem.secure_url);
      }
    } catch (e) {
      return e;
    }
  }

  async getImagesByUserEmail(userEmail: string) {
    try {
      const response = await cloudinary.search
        .expression(`folder = TasksNestjsReact/${userEmail}`)
        .execute();
      const resources: CloudinaryResponseDto[] = response.resources;
      if (response.total_count > 0) {
        return resources.map((elem: CloudinaryResponseDto) => elem.secure_url);
      }
    } catch (e) {
      return e;
    }
  }

  async deleteImageByFilename(filename: string) {
    try {
      let file = await cloudinary.search
        .expression(`filename = ${filename}`)
        .execute();
      file = file.resources[0].public_id;
      //
      const response = await cloudinary.uploader.destroy(file);
      await this.taskService.deleteTaskImage(filename);
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
