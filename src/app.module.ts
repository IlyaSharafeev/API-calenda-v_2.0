import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarDtoModule } from './calendar/dto/calendar-dto.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CalendarDtoModule,
    MongooseModule.forRoot(
      'mongodb://IlyaSharafeev:Ze74790309@localhost:7017',
      { dbName: 'CalendarDB' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
