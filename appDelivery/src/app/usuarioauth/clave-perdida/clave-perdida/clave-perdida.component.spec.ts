import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClavePerdidaComponent } from './clave-perdida.component';

describe('ClavePerdidaComponent', () => {
  let component: ClavePerdidaComponent;
  let fixture: ComponentFixture<ClavePerdidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClavePerdidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClavePerdidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
