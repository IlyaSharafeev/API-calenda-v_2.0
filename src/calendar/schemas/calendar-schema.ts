import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CalendarDocument = Calendar & Document;

@Schema({
  timestamps: true,
})
export class Calendar {
  @Prop()
  date_start: number;

  @Prop()
  date_end: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
