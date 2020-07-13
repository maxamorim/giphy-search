import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GiphyService } from '../core/giphy.service';
import { GiphyServiceMock } from '../test/mocks/giphy.service.mock';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Giphy } from '../models/giphy.model';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule
      ],
      providers: [
        { provide: GiphyService, useClass: GiphyServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getGiphyImages on enter', () => {
    fixture.detectChanges();
    spyOn(component, 'getGiphyImages');
    const ev = document.createEvent('Events');
    ev.initEvent('keyup', true, true);
    (ev as any).key = 'Enter';

    element = fixture.debugElement.query(By.css('#search-input')).nativeElement;
    element.dispatchEvent(ev);
    fixture.detectChanges();

    expect(component.getGiphyImages).toHaveBeenCalledTimes(1);
  });

  it('form should allow null or empty values', () => {
    fixture.detectChanges();
    (component.form.get('query') as FormArray).push(new FormControl(''));
    (component.form.get('query') as FormArray).push(new FormControl(null));

    expect(component.form.valid).toBeTruthy();
  });

  it('should add new word to form', () => {
    fixture.detectChanges();
    const chipInputEvent = {
      input: {},
      value: 'test word'
    };
    component.addWordChip(chipInputEvent as MatChipInputEvent);

    expect((component.form.get('query') as FormArray).value).toContain('test word');
  });

  it('should remove word from form', () => {
    fixture.detectChanges();
    const chipInputEvent = {
      input: {},
      value: 'test word'
    };
    component.addWordChip(chipInputEvent as MatChipInputEvent);
    component.removeWordChip(0);

    expect((component.form.get('query') as FormArray).value).not.toContain('test word');
  });

  it('should display result only when contains value', async(() => {
    fixture.detectChanges();
    const expectedGiphys: Giphy =
      {
        data: [{
          images: {
            fixed_height: {},
            original: {}
          }
        },
        {
          images: {
            fixed_height: {},
            original: {}
          }
        }],
        pagination: {
          count: 10,
          offset: 1,
          total_count: 100
        }
      };

    element = fixture.debugElement.query(By.css('#result-container')).nativeElement;
    expect(element.classList.contains('display-none')).toBeTruthy();

    component.giphys = expectedGiphys;
    fixture.detectChanges();
    expect(element.classList.contains('display-none')).toBeFalsy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
