import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedPageComponent } from './denied-page.component';

describe('DeniedPageComponent', () => {
  let component: DeniedPageComponent;
  let fixture: ComponentFixture<DeniedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
