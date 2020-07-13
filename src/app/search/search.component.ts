import { Inject, AfterViewInit, HostListener } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { GiphyService } from '../core/giphy.service';
import { Giphy } from '../models/giphy.model';
import { PageEvent } from '@angular/material/paginator';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  form: FormGroup;
  giphys: Giphy;
  pageEvent: PageEvent;
  imageCounter = 0;
  allGifsLoaded = false;

  get query(): FormArray { return this.form.get('query') as FormArray; }

  constructor(private formBuilder: FormBuilder,
              private giphyService: GiphyService,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      query: this.formBuilder.array([])
    });
  }

  addWordChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.query.push(new FormControl(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  removeWordChip(index: number): void {
    this.query.removeAt(index);
    const queryAsString = this.query.value.join();
    this.giphyService.getGiphyImages(queryAsString).then(response => {
      this.giphys = response;
    });
  }

  onImageLoad(resultLength: number): void {
    this.imageCounter++;
    this.trackProgress(resultLength);
    if (this.imageCounter === resultLength) {
      this.imageCounter = 0;
    }
  }

  getGiphyImages(event?: PageEvent): void {
    const queryAsString = this.query.value.join();
    let pageOffset = '0';
    if (event !== null && event !== undefined) {
      pageOffset = (event?.pageSize * event?.pageIndex).toString();
    }
    this.giphyService.getGiphyImages(queryAsString, event?.pageSize.toString(), pageOffset).then(response => {
      this.giphys = response;
    });
  }

  trackProgress(resultLength: number): void {
    const progress = (this.imageCounter / resultLength) * 100;
    this.document.getElementById('progress-bar-top').style.width = progress + '%';
    this.document.getElementById('progress-bar-bottom').style.width = progress + '%';
    if (progress === 100) {
      this.document.getElementById('progress-bar-top').style.display = 'none';
      this.document.getElementById('progress-bar-bottom').style.display = 'none';
      this.allGifsLoaded = true;
    } else {
      this.document.getElementById('progress-bar-top').style.display = '';
      this.document.getElementById('progress-bar-bottom').style.display = '';
      this.allGifsLoaded = false;
    }
  }
}
