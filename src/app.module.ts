import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_PORT || 'localhost',
    //   port: parseInt(process.env.PORT) || 5432,
    //   username: process.env.DB_USERNAME ,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [UserEntity],
    //   synchronize: false,
    //   autoLoadEntities: true,
    //   migrationsRun: true,
    // }),
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
