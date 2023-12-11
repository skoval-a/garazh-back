import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import * as process from "process";
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   url: process.env.DATABASE_URL,
    //   type: 'postgres',
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true, // This for development
    //   autoLoadEntities: true,
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: parseInt(process.env.PORT) || 5432,
    //   username: process.env.DB_USERNAME ,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [UserEntity],
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   migrationsRun: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-241-82-91.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username:'xqcsbyaolshmct',
      password: "e4aa94556cd362eeb4ad681598c4d6de87acc5e83a3ce88d34abdf0d9b2310ba",
      database: "dav6i2nv8o0ou0",
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true,
      migrationsRun: true,
      ssl: {
        ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
