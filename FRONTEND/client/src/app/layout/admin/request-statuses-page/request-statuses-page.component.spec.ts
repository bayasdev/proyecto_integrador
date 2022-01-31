import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusesPageComponent } from './request-statuses-page.component';

describe('RequestStatusesPageComponent', () => {
  let component: RequestStatusesPageComponent;
  let fixture: ComponentFixture<RequestStatusesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStatusesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
