import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseClientComponent } from './add-base-client.component';

describe('AddBaseClientComponent', () => {
  let component: AddBaseClientComponent;
  let fixture: ComponentFixture<AddBaseClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBaseClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
