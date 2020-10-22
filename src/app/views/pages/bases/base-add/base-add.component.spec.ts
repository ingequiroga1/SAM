import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAddComponent } from './base-add.component';

describe('BaseAddComponent', () => {
  let component: BaseAddComponent;
  let fixture: ComponentFixture<BaseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
