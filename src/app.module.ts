import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [TaskModule, UsersModule, StripeModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
