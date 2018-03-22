import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoBuyComponent } from './shinto-buy.component';

describe('ShintoBuyComponent', () => {
  let component: ShintoBuyComponent;
  let fixture: ComponentFixture<ShintoBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
