import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { Calendar, CalendarDocument } from './schemas/calendar-schema';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private calendarModule: Model<CalendarDocument>,
  ) {}

  async getAll(): Promise<Calendar[]> {
    return this.calendarModule.find().exec();
  }

  async getById(id: string): Promise<Calendar> {
    return this.calendarModule.findById(id);
  }

  async create(createCalendarDto): Promise<Calendar> {
    const newEvent = new this.calendarModule();
    newEvent.title = createCalendarDto.title;
    newEvent.description = createCalendarDto.description;
    newEvent.date_start = createCalendarDto.date_start;
    newEvent.date_end = createCalendarDto.date_end;
    return newEvent.save();
  }

  async remove(id: string): Promise<Calendar> {
    return this.calendarModule.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateCalendarDto): Promise<Calendar> {
    return this.calendarModule.findByIdAndUpdate(id, productDto, { new: true });
  }
}
