import { ConfigService } from '@nestjs/config';

const configService = new ConfigService

export const jwtConstants = {
    secret:  configService.get('SECRETJWT'),
  };
export const saltOrRounds = configService.get('SALTORROUNDS');

 export const CLOUDINARY_cloud_name = configService.get('CLOUDINARY_cloud_name')
 export const CLOUDINARY_api_key = configService.get('CLOUDINARY_api_key')
 export const CLOUDINARY_api_secret = configService.get('CLOUDINARY_api_secret') 