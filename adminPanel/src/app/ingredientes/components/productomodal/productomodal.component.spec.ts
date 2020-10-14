import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductomodalComponent } from './productomodal.component';

describe('ProductomodalComponent', () => {
  let component: ProductomodalComponent;
  let fixture: ComponentFixture<ProductomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
