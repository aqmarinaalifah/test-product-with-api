import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.routes'),
      },
    ],
  },

  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'after-login',
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.routes'),
      },
      {
        path: 'product-detail/:id',
        loadChildren: () =>
          import('./modules/product-detail/product-detail.routes'),
      },
    ],
  },
];
