import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoHomeComponent } from './shinto-home.component';

describe('ShintoHomeComponent', () => {
  let component: ShintoHomeComponent;
  let fixture: ComponentFixture<ShintoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
