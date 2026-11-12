import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { CartPage } from './pages/cart/cart';
import { Favoritos } from './pages/favoritos/favoritos';
import { PedidoConfirmado } from './pages/pedido-confirmado/pedido-confirmado';
import { RecuperarSenha } from "./recuperar-senha/recuperar-senha";

export const routes: Routes = [
  {
    path: '',
    component: Catalog
  },
  {
    path: 'cart',
    component: CartPage
  },
  {
  path: 'favoritos',
  component: Favoritos
  },
  {
  path: 'pedido-confirmado',
  component: PedidoConfirmado
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
  path: "recuperar-senha",
  component: RecuperarSenha
},
  {
    path: 'product/:id',
    component: ProductDetail
  },
  {
    path: 'catalog',
    component: Catalog
  },
  {
    path: '**',
    redirectTo: ''
  }
];