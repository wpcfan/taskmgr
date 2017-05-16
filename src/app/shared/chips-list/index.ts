import { 
  Component, 
  Input, 
  forwardRef, 
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  FormControl 
} from '@angular/forms';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ChipsListComponent implements ControlValueAccessor {
  @Input()
  items: string[];
  @Output()
  deleteChip = new EventEmitter<void>(); 
  constructor() { }

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };
  // 设置初始值
  public writeValue(obj: any) {
    if (obj && obj !== '') {
      this.items = obj;
    } 
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl) {
    return this.items ? null : {
      imageListSelect: {
        valid: false,
      },
    };
  }
  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() { }

  private removeChip(ev: Event, i: number){
    ev.preventDefault();
    this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)];
    this.deleteChip.emit();
    this.propagateChange(this.items);
  }
}
