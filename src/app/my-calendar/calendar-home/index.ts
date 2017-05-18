import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cal-home',
  template: `
    <mwl-calendar-month-view [viewDate]="viewDate" [locale]="'zh'"></mwl-calendar-month-view>
  `,
  styles:[`
    :host{
      width: 100%;
    }
  `
  ]
})
export class CalendarHomeComponent implements OnInit {
  viewDate: Date;
  constructor() { 
    this.viewDate = new Date();

  }

  ngOnInit() { }
}