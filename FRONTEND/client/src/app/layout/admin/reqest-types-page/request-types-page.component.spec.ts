import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypesPageComponent } from './request-types-page.component';

describe('RequestTypesPageComponent', () => {
  let component: RequestTypesPageComponent;
  let fixture: ComponentFixture<RequestTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTypesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
