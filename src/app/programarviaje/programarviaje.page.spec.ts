import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarviajePage } from './programarviaje.page';

describe('ProgramarviajePage', () => {
  let component: ProgramarviajePage;
  let fixture: ComponentFixture<ProgramarviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
