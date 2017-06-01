import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-invite',
  template: `
    <md-card>
      <h2 md-dialog-title>{{dialogTitle}}</h2>
      <div class="full-width">
        <app-chip-list></app-chip-list>
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
export class InviteComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
