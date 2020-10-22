import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteModalComponent } from './site-modal.component';

describe('SiteModalComponent', () => {
  let component: SiteModalComponent;
  let fixture: ComponentFixture<SiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
