import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarDocument, Event } from "../src/calendar/schemas/calendar-schema";
import { Model } from 'mongoose';
import { getUnixTime } from "date-fns";

export class Helper {
  constructor(
    private configService: ConfigService,
    @InjectModel(Event.name) private calendarModel: Model<CalendarDocument>,
  ) {}

  async checkAuth(req) {
    if (
      req.rawHeaders[1].slice(7) !== this.configService.get('BEAVER_TOKEN_USER')
    ) {
      throw new HttpException(
        'You are not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async reqAnonymousPost(req, createCalendarDto) {
    if (
      req.rawHeaders[1].slice(7) !== this.configService.get('BEAVER_TOKEN_USER')
    ){
      const result = await this.calendarModel.find({
        date_end: { $gte: createCalendarDto.date_start },
        date_start: { $lte: createCalendarDto.date_end },
      });

      if (result.length > 0) {
        throw new HttpException('Time is already taken', HttpStatus.FORBIDDEN);
      }
    }
  }

  async checkTime(eventData) {
    const CONDITION_TIME_THREE_HOURS = 10800; // 3h = 10800s
    const timeToStart = eventData.date_start;
    const timeToNow = getUnixTime(new Date());
    if(Number(timeToNow) - Number(timeToStart) < CONDITION_TIME_THREE_HOURS){
      throw new HttpException(
        'Less than 3 hours left before the event',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    };
  }
}