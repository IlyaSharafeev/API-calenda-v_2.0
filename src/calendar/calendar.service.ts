import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, CalendarDocument } from './schemas/calendar-schema';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Event.name) private calendarModel: Model<CalendarDocument>,
  ) {}

  async getAll(getCalendarOptions): Promise<Event[]> {
    return this.calendarModel.find(
      {
        date_start: { $gte: getCalendarOptions.date_start },
        date_end: { $lte: getCalendarOptions.date_end },
      }
    ).exec();
  }

  async getById(id: string): Promise<Event> {
    return this.calendarModel.findById(id);
  }

  async create(createCalendarDto): Promise<Event> {
    const newEvent = new this.calendarModel();
    newEvent.title = createCalendarDto.title;
    newEvent.description = createCalendarDto.description;
    newEvent.date_start = createCalendarDto.date_start;
    newEvent.date_end = createCalendarDto.date_end;
    return newEvent.save();
  }

  async remove(id: string): Promise<Event> {
    return this.calendarModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    calendarDto: {
      date_start: number;
      description: string;
      date_end: number;
      title: string;
    },
  ): Promise<Event> {
    return this.calendarModel.findByIdAndUpdate(id, calendarDto, { new: true });
  }
}
