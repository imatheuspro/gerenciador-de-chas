import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProduto } from './formulario-produto';

describe('FormularioProduto', () => {
  let component: FormularioProduto;
  let fixture: ComponentFixture<FormularioProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
