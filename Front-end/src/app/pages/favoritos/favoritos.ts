import { Component } from '@angular/core';
import { ProductCard, Produto } from '../../components/product-card/product-card';
import { productsService } from '../../services/products';
import { cart } from '../../services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  imports: [ProductCard],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

  produtos: Produto[] = [];

  constructor(public router: Router) {
    this.carregarFavoritos();
  }

  carregarFavoritos(): void {
    this.produtos = productsService.listarFavoritos();
  }

  atualizarFavorito(produto: Produto): void {
    productsService.alternarFavorito(produto.id);
    this.carregarFavoritos();
  }

  adicionarAoCarrinho(produto: Produto): void {
    cart.adicionar(produto, 1);
  }

  verProduto(produto: Produto): void {
    this.router.navigate(['/product', produto.id]);
  }
}