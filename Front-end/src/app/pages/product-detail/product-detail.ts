import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productsService } from '../../services/products';
import { Produto } from '../../components/product-card/product-card';
import { cart } from '../../services/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  produto?: Produto;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const p = productsService.buscarPorId(id);

    if (!p) {
      // se não existe, volta para catálogo
      this.router.navigate(['/']);
      return;
    }
    this.produto = p;
  }

  comprar(): void {
    if (!this.produto) return;
  cart.adicionar(this.produto, 1);
  this.router.navigate(['/cart']);
  }

}
