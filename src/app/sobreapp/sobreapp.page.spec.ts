import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreappPage } from './sobreapp.page';

describe('SobreappPage', () => {
  let component: SobreappPage;
  let fixture: ComponentFixture<SobreappPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
