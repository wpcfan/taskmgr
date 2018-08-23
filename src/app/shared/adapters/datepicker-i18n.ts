import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Datepicker data that requires internationalization. */
@Injectable()
export class DatepickerI18n {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  changes: Subject<void> = new Subject<void>();

  /** A label for the calendar popup (used by screen readers). */
  calendarLabel = '日历';

  /** A label for the button used to open the calendar popup (used by screen readers). */
  openCalendarLabel = '打开日历';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = '上月';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = '下月';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = '前一年';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = '下一年';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = '切换月视图';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToYearViewLabel = '切换年视图';
}
