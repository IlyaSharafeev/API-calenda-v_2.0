import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, CalendarDocument } from './schemas/calendar-schema';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Event.name) private calendarModel: Model<CalendarDocument>,
  ) {}

  async getAll(): Promise<Event[]> {
    return this.calendarModel.find().exec();
  }

  async getById(id: string): Promise<Event> {
    return this.calendarModel.findById(id);
  }

  async create(createCalendarDto) {
    const result = await this.calendarModel.find({
      date_end: { $gte: createCalendarDto.date_start },
      date_start: { $lte: createCalendarDto.date_end },
    });
    if (result.length > 0) {
      throw new HttpException('Time is already taken', HttpStatus.FORBIDDEN);
    }
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

  async update(id: string, productDto: UpdateCalendarDto): Promise<Event> {
    return this.calendarModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
