import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoShowComponent } from './shinto-show.component';

describe('ShintoShowComponent', () => {
  let component: ShintoShowComponent;
  let fixture: ComponentFixture<ShintoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
