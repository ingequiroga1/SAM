import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBaseClientComponent } from './detail-base-client.component';

describe('DetailBaseClientComponent', () => {
  let component: DetailBaseClientComponent;
  let fixture: ComponentFixture<DetailBaseClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBaseClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
