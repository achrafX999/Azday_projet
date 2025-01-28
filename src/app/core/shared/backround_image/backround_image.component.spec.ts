/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Backround_imageComponent } from './backround_image.component';

describe('Backround_imageComponent', () => {
  let component: Backround_imageComponent;
  let fixture: ComponentFixture<Backround_imageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Backround_imageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Backround_imageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
