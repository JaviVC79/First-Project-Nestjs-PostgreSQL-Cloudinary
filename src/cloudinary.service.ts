import { Injectable } from "@nestjs/common";
import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_api_key, CLOUDINARY_api_secret, CLOUDINARY_cloud_name } from "src/users/constants";
import { CloudinaryResponseDto } from "./dto/cloudinary-response.dto";


cloudinary.config({ 
    cloud_name: CLOUDINARY_cloud_name, 
    api_key: CLOUDINARY_api_key, 
    api_secret: CLOUDINARY_api_secret 
  });


@Injectable()
export class CloudinaryService {
    
    async uploadImage(URL: string, public_id: string){
        await cloudinary.uploader.upload(URL,
        { public_id: public_id }, 
        function(error, result) {console.log(result); });
    }

    async getImageByFilename(filename: string){
        const response = await cloudinary.search
        .expression(`filename = ${filename}`)
        .execute()
        const resources: CloudinaryResponseDto [] = response.resources;
        if (response.total_count > 0) {
            return resources.map((elem: CloudinaryResponseDto) => elem.secure_url)} 
        
    }

}