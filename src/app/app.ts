import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { cart } from './services/cart';



import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink, Login, Cadastro],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pet-shop');

  logado = false;

  mensagem = signal('');

  private timeoutMensagem: ReturnType<typeof setTimeout> | undefined;

  constructor(private router: Router) {
    this.verificarLogin();

    window.addEventListener('loginAlterado', () => {
      this.verificarLogin();
    });

    window.addEventListener('notificacao', (event: Event) => {
      const evento = event as CustomEvent<string>;

      this.mostrarNotificacao(evento.detail);
    });
  }

  verificarLogin(): void {
    this.logado = localStorage.getItem('logado') === 'true';
  }

  sair(): void {
    localStorage.removeItem('logado');

    this.logado = false;

    window.dispatchEvent(new Event('loginAlterado'));

    this.mostrarNotificacao('Você saiu da sua conta.');

    this.router.navigate(['/']);
  }

  mostrarNotificacao(texto: string): void {
    this.mensagem.set(texto);

    if (this.timeoutMensagem) {
      clearTimeout(this.timeoutMensagem);
    }

    this.timeoutMensagem = setTimeout(() => {
      this.mensagem.set('');
    }, 3500);
  }

  carrinhoItemCount(): number {
    return cart.totalItems ();
  }
}
