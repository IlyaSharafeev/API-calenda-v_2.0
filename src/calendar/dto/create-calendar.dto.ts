import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { getUnixTime } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateCalendarDto {
  @IsNotEmpty()
  private readonly date: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly duration: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  public getData() {
    return {
      date_start: this.getTimeInSeconds(this.date),
      date_end: this.getTimeInSeconds(this.date) + this.duration,
      title: this.title,
      description: this.description,
    };
  }

  public getTimeInSeconds(date) {
    const unixTime = getUnixTime(new Date(date));
    if(unixTime < 0) {
      throw new HttpException(
        'Не верно создано событие',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(typeof unixTime);
    return unixTime;
  }
}
