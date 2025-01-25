import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedContainerComponent } from './rounded-container.component';

describe('RoundedContainerComponent', () => {
  let component: RoundedContainerComponent;
  let fixture: ComponentFixture<RoundedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoundedContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
