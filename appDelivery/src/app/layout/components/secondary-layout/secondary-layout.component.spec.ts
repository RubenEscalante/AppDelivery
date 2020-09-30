import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLayoutComponent } from './secondary-layout.component';

describe('SecondaryLayoutComponent', () => {
  let component: SecondaryLayoutComponent;
  let fixture: ComponentFixture<SecondaryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
