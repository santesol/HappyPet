import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-confirmado',
  imports: [],
  templateUrl: './pedido-confirmado.html',
  styleUrl: './pedido-confirmado.css'
})
export class PedidoConfirmado {

  numeroPedido: string;

  constructor(private router: Router) {
    this.numeroPedido =
      localStorage.getItem('ultimoPedido') ?? '000000';
  }

  voltarParaLoja(): void {
    this.router.navigate(['/']);
  }
}