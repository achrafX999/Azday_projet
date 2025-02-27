/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecentSearchesComponent } from './recent-searches.component';

describe('RecentSearchesComponent', () => {
  let component: RecentSearchesComponent;
  let fixture: ComponentFixture<RecentSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSearchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
