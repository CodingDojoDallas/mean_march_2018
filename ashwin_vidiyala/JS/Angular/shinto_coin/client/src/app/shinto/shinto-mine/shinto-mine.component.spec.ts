import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoMineComponent } from './shinto-mine.component';

describe('ShintoMineComponent', () => {
  let component: ShintoMineComponent;
  let fixture: ComponentFixture<ShintoMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
