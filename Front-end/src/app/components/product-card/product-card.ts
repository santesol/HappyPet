import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  favorito: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {

  @Input() produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    imagem: '',
    categoria: '',
    favorito: false,
  };

  @Output() favoritoAlterado = new EventEmitter<Produto>();
  @Output() adicionar = new EventEmitter<Produto>();
  @Output() ver = new EventEmitter<Produto>();

  added = false;

  favoritar(): void {
    const produto = this.produto;
    this.favoritoAlterado.emit(produto);
  }

  adicionarAoCarrinho(): void {
    const produto = this.produto;
    this.adicionar.emit(produto);
    this.added = true;
    setTimeout(() => (this.added = false), 900);
  }

  verDetalhe(): void {
    const produto = this.produto;
    this.ver.emit(produto);
  }

}