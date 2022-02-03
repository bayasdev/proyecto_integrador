import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestViewerPageComponent } from './request-viewer-page.component';

describe('RequestViewerPageComponent', () => {
  let component: RequestViewerPageComponent;
  let fixture: ComponentFixture<RequestViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestViewerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
