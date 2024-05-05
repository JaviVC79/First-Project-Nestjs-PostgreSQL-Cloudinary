import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'

@Controller()
export class HelloController {

    @Get('/hello')
    index(@Req() request: Request, @Res() response: Response) {
        response.status(200).json({
            message:"Hello World",
        })
    }
}
