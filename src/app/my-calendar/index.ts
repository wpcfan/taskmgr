import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {CalendarModule} from 'angular-calendar';
import {CalendarRoutingModule} from './my-calendar-routing.module';
import {CalendarHomeComponent} from './calendar-home';

@NgModule({
  declarations: [CalendarHomeComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    CalendarModule.forRoot()
  ]
})
export class MyCalendarModule {
}
