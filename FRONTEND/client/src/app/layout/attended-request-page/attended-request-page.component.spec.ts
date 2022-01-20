import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedRequestPageComponent } from './attended-request-page.component';

describe('AttendedRequestPageComponent', () => {
  let component: AttendedRequestPageComponent;
  let fixture: ComponentFixture<AttendedRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendedRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
