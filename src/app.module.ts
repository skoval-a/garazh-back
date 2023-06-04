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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'primary.db-garazh--y2rj87zmcyys.addon.code.run',
      port: 5432,
      username:'_17a53df390b0ba1e',
      password: "_2dfd5e599eae11cdce4101fccef093",
      database: "_f60fd0d7451f",
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
