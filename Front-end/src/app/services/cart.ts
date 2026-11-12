import { Produto } from '../components/product-card/product-card';

export interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

const STORAGE_KEY = 'happyPet.carrinho';

export class CarrinhoService {
  private items: CarrinhoItem[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.items = JSON.parse(raw) as CarrinhoItem[];
    } catch {
      this.items = [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  listar(): CarrinhoItem[] {
    return this.items;
  }

  adicionar(produto: Produto, quantidade = 1): void {
    const idx = this.items.findIndex(i => i.produto.id === produto.id);
    if (idx >= 0) {
      this.items[idx].quantidade += quantidade;
    } else {
      this.items.push({ produto, quantidade });
    }
    this.persist();
  }

  alterarQuantidade(produtoId: number, quantidade: number): void {
    const idx = this.items.findIndex(i => i.produto.id === produtoId);
    if (idx >= 0) {
      this.items[idx].quantidade = Math.max(0, quantidade);
      if (this.items[idx].quantidade === 0) {
        this.items.splice(idx, 1);
      }
      this.persist();
    }
  }

  remover(produtoId: number): void {
    this.items = this.items.filter(i => i.produto.id !== produtoId);
    this.persist();
  }
  
  limpar(): void {
    this.items = [];
    this.persist();
  }

  subtotal(): number {
    return this.items.reduce((s, i) => s + i.produto.preco * i.quantidade, 0);
  }

  totalItems(): number {
    return this.items.reduce((s, i) => s + i.quantidade, 0);
  }
}

export const cart = new CarrinhoService();
