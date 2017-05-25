import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[a-z]/g, '').replace(' ', '');
  }

}
