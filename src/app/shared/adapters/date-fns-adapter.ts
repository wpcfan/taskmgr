import { Optional, Inject, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material';
import {
  getYear,
  getMonth,
  getDate,
  getDay,
  getDaysInMonth,
  format,
  addYears,
  addMonths,
  addDays,
  isValid,
  toDate
} from 'date-fns';
import * as dateFns from 'date-fns';
import {range} from 'lodash';

const DEFAULT_DATE_NAMES = range(1, 31).map(i => String(i));

@Injectable()
export class DateFnsAdapter extends DateAdapter<Date> {

  getYear(date: Date): number {
    return getYear(date);
  }
  getMonth(date: Date): number {
    return getMonth(date);
  }
  getDate(date: Date): number {
    return getDate(date);
  }
  getDayOfWeek(date: Date): number {
    return getDay(date);
  }
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long': {
        return [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月',
        ]
      }
      case 'short':
      case 'narrow':
      default: {
        return [
          '一', '二', '三', '四', '五', '六',
          '七', '八', '九', '十', '十一', '十二',
        ]
      }
    }
  }
  getDateNames(): string[] {
    return DEFAULT_DATE_NAMES;
  }
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long': {
        return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      }
      case 'short':
      case 'narrow':
      default: {
        return ['日', '一', '二', '三', '四', '五', '六'];
      }
    }
  }
  getYearName(date: Date): string {
    return `${this.getYear(date)}年`;
  }
  getFirstDayOfWeek(): number {
    return 0;
  }
  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }
  clone(date: Date): Date {
    return toDate(this.createDate(this.getYear(date),  this.getMonth(date), this.getDate(date)));
  }
  createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }
  today(): Date {
    return new Date();
  }
  parse(value: any): Date | null {
    return toDate(value);
  }
  format(date: Date, displayFormat: Object): string {
    return format(date, <string>displayFormat);
  }
  addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }
  addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }
  addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }
  getISODateString(date: Date): string {
    return [
      date.getUTCFullYear(),
      this._2digit(date.getUTCMonth() + 1),
      this._2digit(date.getUTCDate())
    ].join('-');
  }
  isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }
  isValid(date: Date): boolean {
    return isValid(date);
  }
    /**
   * Pads a number to make it two digits.
   * @param n The number to pad.
   * @returns The padded number.
   */
  private _2digit(n: number) {
    return ('00' + n).slice(-2);
  }

}
