import { Module } from '@nestjs/common';
import { CalendarDtoModule } from './calendar/dto/calendar-dto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CalendarDtoModule,
    MongooseModule.forRoot(
      'mongodb://IlyaSharafeev:Ze74790309@localhost:7017',
      { dbName: 'CalendarDB' },
    ),
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
