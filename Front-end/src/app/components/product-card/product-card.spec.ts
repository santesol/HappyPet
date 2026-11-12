/* importa modulos de testes e o card de produtos */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
/* configuração dos testes */
describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    const sample = {
      id: 0,
      nome: 'Teste',
      descricao: 'Descrição',
      preco: 1,
      imagem: '',
      categoria: '',
      favorito: false,
    };

    // make `produto` usable both as a function (old signal-based template)
    // and as an object (current template). This prevents tests breaking
    // while templates/components are in transition.
    const callable: any = Object.assign(function() { return sample; }, sample);
    (component as any).produto = callable;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
