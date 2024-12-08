import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // توجيه افتراضي إلى صفحة تسجيل الدخول
  { path: 'auth', loadComponent: () => import('./components/auth/auth.component').then((m) => m.AuthComponent) },

  {
    path: 'home',
    loadComponent: () => import('../app/components/home/home.component').then((m) => m.HomeComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('../app/components/products/products.component').then((m) => m.ProductsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'carts',
    loadComponent: () => import('../app/components/carts/carts.component').then((m) => m.CartsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('../app/components/users/users.component').then((m) => m.UsersComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadComponent: () => import('../app/components/categories/categories.component').then((m) => m.CategoriesComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./components/edit-product/edit-product.component').then((m) => m.AddEditProductComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'add-product',
    loadComponent: () => import('./components/add-product/add-product.component').then((m) => m.AddProductComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'product-details/:id',
    loadComponent: () => import('./components/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'add-user',
    loadComponent: () => import('./components/add-user/add-user.component').then((m) => m.AddUserComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'edit-User/:id',
    loadComponent: () => import('./components/edit-user/edit-user.component').then((m) => m.EditUserComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'User-details/:id',
    loadComponent: () => import('./components/user-details/user-details.component').then((m) => m.UserDetailsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'user-cart/:id',
    loadComponent: () => import('./components/user-cart/user-cart.component').then((m) => m.UserCartComponent),
    // canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'auth' }, // توجيه المسارات غير المعروفة إلى تسجيل الدخول

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



