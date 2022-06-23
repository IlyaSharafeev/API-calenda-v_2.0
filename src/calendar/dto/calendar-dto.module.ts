import { Module } from '@nestjs/common';
import { CalendarService } from '../calendar.service';
import { CalendarController } from '../calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from '../schemas/calendar-schema';

@Module({
  providers: [CalendarService],
  controllers: [CalendarController],
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalendarSchema }
    ])
  ],
})
export class CalendarDtoModule {}
