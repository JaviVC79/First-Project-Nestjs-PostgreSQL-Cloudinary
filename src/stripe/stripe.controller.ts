import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { StripeService, StrapiItem } from './stripe.service';

@Controller('/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
  @UseGuards(AuthGuard)
  @Post('payments')
  sendPayment(@Body() strapiItem: StrapiItem) {
    //const amount = strapiItem.amount;
    //parseamount = parseInt(amount);
    return this.stripeService.sendPayment(strapiItem);
  }
}
