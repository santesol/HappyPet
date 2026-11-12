import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catalog } from './catalog';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalog],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by search text and selected tag', () => {
    component.searchTerm.set('coleira');

    expect(component.produtosFiltrados().map((produto) => produto.nome)).toEqual([
      'Coleira Happy',
    ]);

    component.selectedTag.set('Brinquedos');
    expect(component.produtosFiltrados().length).toBe(0);

    component.selectedTag.set('Todas');
    component.searchTerm.set('');
    expect(component.produtosFiltrados().length).toBe(4);
  });
});
