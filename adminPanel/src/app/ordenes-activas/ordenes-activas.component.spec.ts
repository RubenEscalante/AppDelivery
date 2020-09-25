import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesActivasComponent } from './ordenes-activas.component';

describe('OrdenesActivasComponent', () => {
  let component: OrdenesActivasComponent;
  let fixture: ComponentFixture<OrdenesActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
