import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarRoutingModule } from './my-calendar-routing.module';
import { CalendarHomeComponent } from './calendar-home';

@NgModule({
  declarations: [CalendarHomeComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class MyCalendarModule {}
