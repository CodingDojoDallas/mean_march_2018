import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskShowComponent } from './task-show.component';

describe('TaskShowComponent', () => {
  let component: TaskShowComponent;
  let fixture: ComponentFixture<TaskShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
