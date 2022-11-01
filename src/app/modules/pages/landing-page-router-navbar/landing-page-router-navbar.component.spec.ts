import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageRouterNavbarComponent } from './landing-page-router-navbar.component';

describe('LandingPageRouterNavbarComponent', () => {
  let component: LandingPageRouterNavbarComponent;
  let fixture: ComponentFixture<LandingPageRouterNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageRouterNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageRouterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
