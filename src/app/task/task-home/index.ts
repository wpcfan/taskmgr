import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      projectId: 1,
      items: [
        {
          desc: '吃晚餐',
          updated: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      projectId: 1,
      items: [
        {
          desc: '写文档',
          updated: new Date()
        }
      ]
    },
    {
      id: 3,
      name: '已完成',
      projectId: 1,
      items: [
        {
          desc: '做演示',
          updated: new Date()
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  onDrag(e){
    console.log('drag:'+ e);
  }
  onDragStart(e){
    e.style.opacity=.5;
    console.log('drag start:' + e);
  }
  onDragEnd(e){
    console.log('drag end:' + e);
  }
  onDragOver(e: Event){
    e.preventDefault();
  }
}
