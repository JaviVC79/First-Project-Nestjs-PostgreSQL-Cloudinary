import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TaskModule, UsersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: []
})
export class AppModule {}
