import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import {MyCalService} from '../../services';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';


@Component({
  selector: 'app-cal-home',
  template: `
  <div *ngIf="(events$ | async) as calEvents">
    <div [ngSwitch]="view$ | async">
      <mwl-calendar-month-view
        *ngSwitchCase="'month'"
        [viewDate]="viewDate"
        [locale]="'zh'"
        [events]="calEvents"
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
        [events]="calEvents"
        [refresh]="refresh"
        (eventClicked)="handleEvent('Clicked', $event.event)"
        (eventTimesChanged)="eventTimesChanged($event)">
      </mwl-calendar-week-view>
      <mwl-calendar-day-view
        *ngSwitchCase="'day'"
        [viewDate]="viewDate"
        [locale]="'zh'"        
        [events]="calEvents"
        [refresh]="refresh"
        (eventClicked)="handleEvent('Clicked', $event.event)"
        (eventTimesChanged)="eventTimesChanged($event)">
      </mwl-calendar-day-view>
    </div>
   </div>
  `,
  styles: [`
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
  activeDayIsOpen = true;
  events$: Observable<CalendarEvent[]>;

  constructor(private route: ActivatedRoute,
              private service$: MyCalService,
              private store$: Store<fromRoot.State>) {
    this.viewDate = new Date();
    this.view$ = this.route.params.pluck('view');
    this.events$ = this.store$.select(fromRoot.getAuthUser)
      .switchMap(user => this.service$.getUserTasks(user.id));
  }

  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

  dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {

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
