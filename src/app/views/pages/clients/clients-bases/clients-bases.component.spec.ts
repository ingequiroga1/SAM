import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsBasesComponent } from './clients-bases.component';

describe('ClientsBasesComponent', () => {
  let component: ClientsBasesComponent;
  let fixture: ComponentFixture<ClientsBasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsBasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
