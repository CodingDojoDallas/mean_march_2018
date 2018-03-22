import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShintoLedgerComponent } from './shinto-ledger.component';

describe('ShintoLedgerComponent', () => {
  let component: ShintoLedgerComponent;
  let fixture: ComponentFixture<ShintoLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShintoLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShintoLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
