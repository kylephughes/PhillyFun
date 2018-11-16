import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySpecialsCardComponent } from './daily-specials-card.component';

describe('DailySpecialsCardComponent', () => {
  let component: DailySpecialsCardComponent;
  let fixture: ComponentFixture<DailySpecialsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySpecialsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySpecialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
