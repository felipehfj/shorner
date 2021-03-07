import { differenceInSeconds, parseJSON, format as formatFns, formatRelative, formatDistanceToNow, isBefore } from "date-fns";
import { format as tzformat, toDate, utcToZonedTime } from 'date-fns-tz';
//import { utcToZonedTime } from "date-fns-tz/esm";
import ptBr from 'date-fns/locale/pt-BR';

const log = console.log;

type distanceToNowOptions = {
  includeSeconds?: boolean,
  addSuffix?: boolean,
  locale?: Locale
}

class DatetimeUtils {
  timeZone: string = '';

  constructor() {
    this.timeZone = 'America/Sao_Paulo';
  }
  /**
   * 
   * @param given_seconds 
   */
  secondsInTime(given_seconds: number) {
    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    return hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0');
  }

  differenceInTime(startDate: Date | string | undefined, endDate: Date | String | undefined): string {
    let start: Date;
    let end: Date;
    let sum: number;

    if (startDate && endDate) {
      start = typeof startDate === 'string' ? parseJSON(startDate) : startDate as Date;
      end = typeof endDate === 'string' ? parseJSON(endDate) : endDate as Date;
      sum = differenceInSeconds(end, start);

      return this.secondsInTime(sum);
    }
    return (this.secondsInTime(0))

  }

  dateRelative(date: number | Date | string | undefined, baseDate?: Date): string {
    if (date) {
      let format = typeof date === 'string' ? parseJSON(date) : date;
      let base = baseDate ?? new Date();

      if (format) {
        return formatRelative(utcToZonedTime(format, this.timeZone), base, { locale: ptBr })
      }
    }
    return 'Indefinido';
  }

  format(date: Date | string | undefined): string {
    if (date) {
      let format = typeof date === 'string' ? parseJSON(date) : date;

      return formatFns(utcToZonedTime(format, this.timeZone), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBr })
    }
    return 'Indefinido';
  }


  distanceToNow(date: Date | string | undefined, options?: distanceToNowOptions): string {
    if (date) {
      let format = typeof date === 'string' ? parseJSON(date) : date;

      let localOptions: distanceToNowOptions = { locale: ptBr }

      if (options) {
        Object.assign(localOptions, options)
      }

      return formatDistanceToNow(utcToZonedTime(format, this.timeZone), localOptions)
    }
    return 'Indefinido';
  }

  isBefore(date: Date | string | undefined, dateToCompare: Date | string | undefined): boolean {
    if (date && dateToCompare) {
      let formattedDate = typeof date === 'string' ? parseJSON(date) : date;
      let formattedDateToCompare = typeof dateToCompare === 'string' ? parseJSON(dateToCompare) : dateToCompare;

      return isBefore(formattedDate, formattedDateToCompare);
    }
    return false;
  }

  parseDate(date: Date | string | undefined): Date {
    if (date) {
      let formattedDate = typeof date === 'string' ? parseJSON(date) : date;
      return utcToZonedTime(formattedDate, this.timeZone)
    }
    else {
      return new Date(8640000000000000);
    }
  }

  newDate(): Date {
    const apiDate = new Date();
    const date = toDate(apiDate, {timeZone: this.timeZone});
    log(JSON.stringify(apiDate), JSON.stringify(date))
    return date;
  }

}

export default new DatetimeUtils();