import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeansPageComponent } from './deans-page.component';

describe('DeansPageComponent', () => {
  let component: DeansPageComponent;
  let fixture: ComponentFixture<DeansPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeansPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeansPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
