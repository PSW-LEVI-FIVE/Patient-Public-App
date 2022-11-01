import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedFeedbackListComponent } from './published-feedback-list.component';

describe('PublishedFeedbackListComponent', () => {
  let component: PublishedFeedbackListComponent;
  let fixture: ComponentFixture<PublishedFeedbackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedFeedbackListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedFeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
