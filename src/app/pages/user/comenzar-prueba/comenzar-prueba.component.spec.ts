import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzarPruebaComponent } from './comenzar-prueba.component';

describe('ComenzarPruebaComponent', () => {
  let component: ComenzarPruebaComponent;
  let fixture: ComponentFixture<ComenzarPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComenzarPruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComenzarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
