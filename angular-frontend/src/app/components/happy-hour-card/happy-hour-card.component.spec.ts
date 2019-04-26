import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyHourCardComponent } from './happy-hour-card.component';

describe('HappyHourCardComponent', () => {
  let component: HappyHourCardComponent;
  let fixture: ComponentFixture<HappyHourCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyHourCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyHourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
