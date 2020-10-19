import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpupusasComponent } from './modalpupusas.component';

describe('ModalpupusasComponent', () => {
  let component: ModalpupusasComponent;
  let fixture: ComponentFixture<ModalpupusasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpupusasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpupusasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
