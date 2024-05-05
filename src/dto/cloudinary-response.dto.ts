import { IsNumber, IsString, IsOptional } from "class-validator"


export class CloudinaryResponseDto{
    
    @IsOptional()
    @IsString()
    asset_id: string | null
    public_id: string | null
    folder: string | null
    filename: string | null
    format: string | null

    @IsOptional()
    @IsNumber()
    version: number | null

    @IsOptional()
    @IsString()
    resource_type: string | null
    type: string | null
    created_at: string | null
    uploaded_at: string | null

    @IsOptional()
    @IsNumber()
    bytes: number | null
    backup_bytes: number | null
    width: number | null
    height: number | null
    aspect_ratio: number | null
    pixels: number | null

    @IsOptional()
    @IsString()
    url: string | null
    secure_url: string | null
    status: string | null
    access_mode: string | null
    access_control: string | null
    etag: string | null
    created_by: string | null
    uploaded_by: string | null

}