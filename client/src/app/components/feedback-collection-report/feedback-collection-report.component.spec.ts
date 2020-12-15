import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCollectionReportComponent } from './feedback-collection-report.component';

describe('FeedbackCollectionReportComponent', () => {
  let component: FeedbackCollectionReportComponent;
  let fixture: ComponentFixture<FeedbackCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
