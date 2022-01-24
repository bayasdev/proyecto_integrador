import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionTypesPageComponent } from './petition-types-page.component';

describe('PetitionTypesPageComponent', () => {
  let component: PetitionTypesPageComponent;
  let fixture: ComponentFixture<PetitionTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetitionTypesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
