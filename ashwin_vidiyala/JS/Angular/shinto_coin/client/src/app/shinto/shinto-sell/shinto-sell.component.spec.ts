import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoSellComponent } from './shinto-sell.component';

describe('ShintoSellComponent', () => {
  let component: ShintoSellComponent;
  let fixture: ComponentFixture<ShintoSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
