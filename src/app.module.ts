import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/Board/board.module';

@Module({
  imports: [
    BoardModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: process.env.DB_PASS,
      database: 'project',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      charset: 'utf8mb4',
      timezone: 'Asia/Seoul',
    }),
  ],
})
export class AppModule {}
