import { 
  Component, 
  Input, 
  forwardRef, 
  Output,
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

  // the method set in registerOnChange, it is just 
  // a placeholder for a method that takes one parameter, 
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };
  // this is the initial value set to the component
  public writeValue(obj: any) {
    if (obj && obj !== '') {
      this.selected = obj;
    } 
  }
  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
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
  // not used, used for touch input
  public registerOnTouched() { }
  // 列表元素选择发生改变触发
  private onChange(i) {
    this.selected = this.items[i];
    // 更新表单
    this.propagateChange(this.items[i]);
  }

}
