import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoComponent } from './shinto.component';

describe('ShintoComponent', () => {
  let component: ShintoComponent;
  let fixture: ComponentFixture<ShintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
