/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Deux_circle_image_homeComponent } from './deux_circle_image_home.component';

describe('Deux_circle_image_homeComponent', () => {
  let component: Deux_circle_image_homeComponent;
  let fixture: ComponentFixture<Deux_circle_image_homeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Deux_circle_image_homeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Deux_circle_image_homeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
