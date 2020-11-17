import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuPupusaComponent } from './tu-pupusa.component';

describe('TuPupusaComponent', () => {
  let component: TuPupusaComponent;
  let fixture: ComponentFixture<TuPupusaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuPupusaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuPupusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
