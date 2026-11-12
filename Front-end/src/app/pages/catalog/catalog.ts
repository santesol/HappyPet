import { Component, computed, signal } from '@angular/core';
import { ProductCard, Produto } from '../../components/product-card/product-card';
import { cart } from '../../services/cart';
import { productsService } from '../../services/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  produtos = signal<Produto[]>(productsService.listar());
  searchTerm = signal('');
  selectedTag = signal('Todas');

  tags = computed(() => {
    const categorias = this.produtos().map((produto) => produto.categoria);
    return ['Todas', ...new Set(categorias)];
  });

  produtosFiltrados = computed(() => {
    const termo = this.searchTerm().trim().toLowerCase();
    const tagSelecionada = this.selectedTag();

    return this.produtos().filter((produto) => {
      const correspondeTag =
        tagSelecionada === 'Todas' || produto.categoria === tagSelecionada;

      const buscaTexto =
        termo.length === 0 ||
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo);

      return correspondeTag && buscaTexto;
    });
  });

  constructor(private router: Router) {}

  atualizarFavorito(produto: Produto): void {
    productsService.alternarFavorito(produto.id);
    this.produtos.set(productsService.listar());
  }

  adicionarAoCarrinho(produto: Produto): void {
    cart.adicionar(produto, 1);
    console.log('Adicionado ao carrinho:', produto);
  }

  verProduto(produto: Produto): void {
    this.router.navigate(['/product', produto.id]);
  }

  limparFiltros(): void {
    this.searchTerm.set('');
    this.selectedTag.set('Todas');
  }
}