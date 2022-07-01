import { fromUnixTime } from "date-fns";

export default class GetCalendarDto {
  public getData(data) {
    return {
      date_start: fromUnixTime(data.date_start),
      date_end: fromUnixTime(data.date_end),
      title: data.title,
      description: data.description
    };
  }

  public getCollections(data) {
    const arr = [];
    for(let i = 0; i < data.length; i++){
      arr.push(this.getData(data[i]));
    }
    return arr;
  }
}