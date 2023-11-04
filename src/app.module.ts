import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantGuideModule } from './restaurant-guide/restaurant-guide.module';
import { RestaurantEntity } from './restaurant-guide/restaurant-guide.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { Restaurant } from './restaurant/entity/restaurant.entity';
import { Category } from './restaurant/entity/category.entity';
import { City } from './restaurant/entity/city.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [Restaurant, City, Category],
    }),
    RestaurantModule,
    RestaurantGuideModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
