import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyHourCreateModalComponent } from './happy-hour-create-modal.component';

describe('HappyHourCreateModalComponent', () => {
  let component: HappyHourCreateModalComponent;
  let fixture: ComponentFixture<HappyHourCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyHourCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyHourCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
