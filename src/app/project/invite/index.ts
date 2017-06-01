import {Component} from '@angular/core';
import {User} from '../../domain';

@Component({
  selector: 'app-invite',
  template: `
    <md-card>
      <h2 md-dialog-title>{{dialogTitle}}</h2>
      <div class="full-width" #f (ngOnSubmit)="onSubmit($event, f)">
        <app-chips-list [label]="'邀请成员'" name="members" [(ngModel)]="members"></app-chips-list>
      </div>
    </md-card>
    <div md-dialog-actions>
      <button md-raised-button
              color="primary"
              type="submit"
              [disabled]="!form.valid">
        保存
      </button>
      <button md-dialog-close md-raised-button type="button">关闭</button>
    </div>
    `,
  styles: [``]
})
export class InviteComponent {
  
  members: User[] = [];

  constructor() { }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    
  }
}
