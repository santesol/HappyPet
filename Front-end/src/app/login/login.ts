import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',

  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './login.html',

  styleUrl: './login.css',
})
export class Login {
  loginForm;

  constructor(
    private fb: FormBuilder,

    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      senha: ['', [Validators.required]],
    });
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'Preencha seu e-mail e sua senha.',
        }),
      );

      return;
    }

    const dados = this.loginForm.value;

    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'Nenhum usuário cadastrado. Faça seu cadastro primeiro.',
        }),
      );

      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (dados.email !== usuario.email || dados.senha !== usuario.senha) {
      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'E-mail ou senha incorretos.',
        }),
      );

      return;
    }

    localStorage.setItem('logado', 'true');

    window.dispatchEvent(new Event('loginAlterado'));

    window.dispatchEvent(
      new CustomEvent('notificacao', {
        detail: 'Login realizado com sucesso!',
      }),
    );

    this.router.navigate(['/']);
  }
}
