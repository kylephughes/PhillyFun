import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyhourViewComponent } from './happyhour-view.component';

describe('HappyhourViewComponent', () => {
  let component: HappyhourViewComponent;
  let fixture: ComponentFixture<HappyhourViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyhourViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyhourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
