import { Directive, HostListener } from '@angular/core';
import Filter from 'bad-words';

@Directive({
  selector: '[appBadWord]'
})
export class BadWordDirective {

  constructor() { }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent): void {
    const filter = new Filter();
    filter.addWords('p3nis', 'v4gina', 's3x');
    if ((event.target as any).value) {
      (event.target as any).value = filter.clean((event.target as any).value).replace(/\*/g, '');
    }
  }

}
