import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services';
import {User} from '../../domain';

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
export class ChipsListComponent implements ControlValueAccessor, OnInit {

  @Input() multiple = true;
  @Input() label = '添加/修改成员';
  @Input() placeholderText = '请输入成员 email';
  @Input() items: User[];
  chips: FormGroup;
  memberResults$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service: UserService) {
    this.items = [];
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chips = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.searchUsers(this.chips.controls['memberSearch'].valueChanges);
  }

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {
  }

  // 设置初始值
  public writeValue(obj: User[]) {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((entities, user) => {
        return {entities, [user.id]: user};
      }, {});
      if(this.items){
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
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
      chipListInvalid: {
        valid: false,
      },
    };
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() { }

  private removeMember(member: User) {
    const ids = this.items.map(u => u.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.propagateChange(this.items);
  }

  handleMemberSelection(user: User) {
    if (this.items.map(u => u.id).indexOf(user.id) >= 0) {
      return;
    }
    if (this.multiple) {
      this.items = [...this.items, user];
    } else {
      this.items = [user];
    }
    this.chips.patchValue({ memberSearch: user.name });
    // 注意必须发射事件后才可以影响其他控件
    this.chips.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }

  searchUsers(obs: Observable<string>): Observable<User[]> {
    return obs.startWith('')
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  get displayInput() {
    return this.multiple || (this.items.length === 0);
  }
}
