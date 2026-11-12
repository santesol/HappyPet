import { Component } from '@angular/core';

import { cart, CarrinhoItem } from '../../services/cart';

import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',

  imports: [CurrencyPipe],

  templateUrl: './cart.html',

  styleUrl: './cart.css',
})
export class CartPage {
  items: CarrinhoItem[] = [];

  constructor(private router: Router) {
    this.reload();
  }

  reload(): void {
    this.items = cart.listar();
  }

  incrementar(item: CarrinhoItem): void {
    cart.adicionar(item.produto, 1);

    this.reload();
  }

  decrementar(item: CarrinhoItem): void {
    cart.alterarQuantidade(item.produto.id, item.quantidade - 1);

    this.reload();
  }

  remover(item: CarrinhoItem): void {
    cart.remover(item.produto.id);

    this.reload();
  }

  subtotal(): number {
    return cart.subtotal();
  }

  finalizar(): void {
    const logado = localStorage.getItem('logado') === 'true';

    if (!logado) {
      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'Você precisa fazer login para finalizar a compra.',
        }),
      );

      this.router.navigate(['/login']);

      return;
    }

    if (this.items.length === 0) {
      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'Seu carrinho está vazio.',
        }),
      );

      return;
    }

    const total = this.subtotal();

    const confirmar = confirm(`Deseja finalizar a compra no valor de R$ ${total.toFixed(2)}?`);

    if (!confirmar) {
      return;
    }

    const numeroPedido = Math.floor(100000 + Math.random() * 900000);

    console.log('Pedido finalizado:', {
      numero: numeroPedido,
      itens: cart.listar(),
      total: total,
    });

    localStorage.setItem('ultimoPedido', numeroPedido.toString());

    cart.limpar();

    this.reload();

    this.router.navigate(['/pedido-confirmado']);
  }
}
