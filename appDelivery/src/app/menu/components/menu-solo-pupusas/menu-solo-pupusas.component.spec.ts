import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSoloPupusasComponent } from './menu-solo-pupusas.component';

describe('MenuSoloPupusasComponent', () => {
  let component: MenuSoloPupusasComponent;
  let fixture: ComponentFixture<MenuSoloPupusasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSoloPupusasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSoloPupusasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
