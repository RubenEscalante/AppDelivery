import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalotrosproductosComponent } from './modalotrosproductos.component';

describe('ModalotrosproductosComponent', () => {
  let component: ModalotrosproductosComponent;
  let fixture: ComponentFixture<ModalotrosproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalotrosproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalotrosproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
