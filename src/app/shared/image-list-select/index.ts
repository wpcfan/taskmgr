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
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,    
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input() selected: string;
  @Input() items: string[] = [];
  @Input() cols: number = 8;
  @Input() rowHeight: string = '64px';
  @Input() itemWidth: string = '80px';
  @Output('itemChange') change = new EventEmitter<string>();
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };
  // 设置初始值
  public writeValue(obj: any) {
    if (obj && obj !== '') {
      this.selected = obj;
    } 
  }
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl) {
    return this.selected ? null : {
      imageListSelect: {
        valid: false,
      },
    };
  }
  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() { }
  // 列表元素选择发生改变触发
  private onChange(i) {
    this.selected = this.items[i];
    // 更新表单
    this.propagateChange(this.items[i]);
    this.change.emit(this.items[i]);
  }

}
