import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrucionesComponent } from './instruciones.component';

describe('InstrucionesComponent', () => {
  let component: InstrucionesComponent;
  let fixture: ComponentFixture<InstrucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
