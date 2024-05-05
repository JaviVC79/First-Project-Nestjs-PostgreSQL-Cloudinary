import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TaskModule, ProjectsModule, AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [HelloController],
  providers: []
})
export class AppModule {}
