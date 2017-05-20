import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-cal-home',
  template: `
    <div [ngSwitch]="view$ | async">
      <mwl-calendar-month-view
        *ngSwitchCase="'month'"
        [viewDate]="viewDate"
        [locale]="'zh'"
        [events]="events"
        [refresh]="refresh"
        [activeDayIsOpen]="activeDayIsOpen"
        (dayClicked)="dayClicked($event.day)"
        (eventClicked)="handleEvent('Clicked', $event.event)"
        (eventTimesChanged)="eventTimesChanged($event)">
      </mwl-calendar-month-view>
      <mwl-calendar-week-view
        *ngSwitchCase="'week'"
        [viewDate]="viewDate"
        [locale]="'zh'"        
        [events]="events"
        [refresh]="refresh"
        (eventClicked)="handleEvent('Clicked', $event.event)"
        (eventTimesChanged)="eventTimesChanged($event)">
      </mwl-calendar-week-view>
      <mwl-calendar-day-view
        *ngSwitchCase="'day'"
        [viewDate]="viewDate"
        [locale]="'zh'"        
        [events]="events"
        [refresh]="refresh"
        (eventClicked)="handleEvent('Clicked', $event.event)"
        (eventTimesChanged)="eventTimesChanged($event)">
      </mwl-calendar-day-view>
    </div>
  `,
  styles:[`
    :host{
      width: 100%;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHomeComponent implements OnInit {
  viewDate: Date;
  view$: Observable<string>;
  modalData: {
    action: string,
    event: CalendarEvent
  };
  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  events: CalendarEvent[] = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue
  }, {
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'A draggable and resizable event',
    color: colors.yellow,
    actions: this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }];
  activeDayIsOpen: boolean = true;
  constructor(private route: ActivatedRoute) { 
    this.viewDate = new Date();
    this.view$ = this.route.params.pluck('view')
  }

  ngOnInit() { }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled')
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}