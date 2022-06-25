import { Module } from '@nestjs/common';
import { CalendarService } from '../calendar.service';
import { CalendarController } from '../calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, CalendarSchema } from '../schemas/calendar-schema';
import { Helper } from '../../../helper/Helper';

@Module({
  providers: [CalendarService, Helper],
  controllers: [CalendarController],
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: CalendarSchema }
    ])
  ],
})
export class CalendarDtoModule {}
