import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyhourComponent } from './happyhour.component';

describe('HappyhourComponent', () => {
  let component: HappyhourComponent;
  let fixture: ComponentFixture<HappyhourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyhourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
