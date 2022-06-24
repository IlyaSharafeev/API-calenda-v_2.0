import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CalendarDocument = Event & Document;

@Schema({
  timestamps: true,
})
export class Event {
  @Prop()
  date_start: number;

  @Prop()
  date_end: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const CalendarSchema = SchemaFactory.createForClass(Event);
