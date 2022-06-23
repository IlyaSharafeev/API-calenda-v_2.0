import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsNotEmpty()
  readonly date: any;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: any;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  @IsEmpty()
  readonly description: string;

  public getData() {
    return {
      date_start: this.date,
      date_end: this.date + this.duration,
      title: this.title,
      description: this.description,
    };
  }
}
