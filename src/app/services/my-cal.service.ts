import { Injectable, Inject } from '@angular/core';
import { Http, Request } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Task } from "../domain";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay
} from 'date-fns';

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

const getPriorityColor = (priority: number) => {
  switch(priority){
    case 1: return colors.red;
    case 2: return colors.yellow;
    case 3:
    default:
      return colors.blue;
  }
}

@Injectable()
export class MyCalService {
  constructor(@Inject('BASE_CONFIG') private config, private http: Http){}
  getUserTasks(userId: string): Observable<CalendarEvent[]>{
    const uri =  `${this.config.uri}/tasks`;
    return this.http
      .get(uri, {params: {'ownerId': userId}})
      .map(res => res.json() as Task[])
      .map(tasks => {
        return tasks.map(task => {
          return {
            start: startOfDay(task.createDate),
            end: task.dueDate? endOfDay(task.dueDate): endOfDay(task.createDate),
            title: task.desc,
            color: getPriorityColor(task.priority)
          }
        })
      });
  }
}