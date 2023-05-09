import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: parseInt('5433'),
    //   username: 'postgres',
    //   password: '1111',
    //   database: 'car_place',
    //   entities: [UserEntity],
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   migrationsRun: true,
    // }),
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
