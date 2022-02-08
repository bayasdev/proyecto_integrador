import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRequestsPageComponent } from './active-requests-page.component';

describe('ActiveRequestsPageComponent', () => {
  let component: ActiveRequestsPageComponent;
  let fixture: ComponentFixture<ActiveRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRequestsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
