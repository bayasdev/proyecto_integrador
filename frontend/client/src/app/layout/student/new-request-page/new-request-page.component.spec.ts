import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestPageComponent } from './new-request-page.component';

describe('NewRequestPageComponent', () => {
  let component: NewRequestPageComponent;
  let fixture: ComponentFixture<NewRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
