import { Component, HostBinding } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MyCalService } from '../../services';
import { defaultRouteAnim } from '../../anim';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-cal-home',
  template: `
    <mat-card fxLayout="column" fxLayoutAlign="start stretch">
    <div fxLayout="row">
      <button
        mat-icon-button
        mwlCalendarPreviousView
        [view]="view$ | async"
        [(viewDate)]="viewDate">
        <mat-icon class="md-48">chevron_left</mat-icon>
      </button>
      <button
        mat-button
        mwlCalendarToday
        [(viewDate)]="viewDate">
        {{ viewDate | date: 'yyyy-MM-dd' }}
      </button>
      <button
        mat-icon-button
        mwlCalendarNextView
        [view]="view$ | async"
        [(viewDate)]="viewDate">
        <mat-icon class="md-48">chevron_right</mat-icon>
      </button>
    </div>
    <div *ngIf="(events$ | async) as calEvents">
      <div [ngSwitch]="view$ | async">
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-day-view>
      </div>
     </div>
     </mat-card>
  `,
  styles: [`
    mat-card {
      width: 100%;
    }
  `
  ],
  animations: [defaultRouteAnim],
})
export class CalendarHomeComponent {

  @HostBinding('@routeAnim') state = 'in';
  viewDate: Date;
  view$: Observable<string>;
  activeDayIsOpen = true;
  events$: Observable<CalendarEvent[]>;

  constructor(private route: ActivatedRoute,
    private service$: MyCalService,
    private store$: Store<fromRoot.State>) {
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.pipe(map(p => <string>p.get('view')));
    this.events$ = this.store$.pipe(
      select(fromRoot.getAuthUser),
      switchMap(user => this.service$.getUserTasks(<string>user.id))
    );
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
