import { BadWordDirective } from './bad-word.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appBadWord>`
})
class TestBadWordComponent {
}

describe('BadWordDirective', () => {
  let component: TestBadWordComponent;
  let fixture: ComponentFixture<TestBadWordComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [TestBadWordComponent, BadWordDirective]
    });
    fixture = TestBed.createComponent(TestBadWordComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
});

  it('should create an instance', () => {
    const directive = new BadWordDirective();
    expect(directive).toBeTruthy();
  });

  it('should exclude bad word', () => {
    inputEl.nativeElement.value = 's3x';
    const ev = document.createEvent('Events');
    ev.initEvent('keyup', true, true);
    (ev as any).key = 'A';
    inputEl.nativeElement.dispatchEvent(ev);
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('');
  });

  it('should keep if it is not bad word', () => {
    inputEl.nativeElement.value = 'good word';
    const ev = document.createEvent('Events');
    ev.initEvent('keyup', true, true);
    (ev as any).key = 'A';
    inputEl.nativeElement.dispatchEvent(ev);
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('good word');
  });
});
