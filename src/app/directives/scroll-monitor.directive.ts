import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollMonitor]'
})
export class ScrollMonitorDirective {

  @HostListener('scroll', ['$event.target'])
  onScroll({scrollHeight, clientHeight, scrollTop}) {
    const limit = scrollHeight - clientHeight;
    console.log(scrollTop, limit);
  }
}
