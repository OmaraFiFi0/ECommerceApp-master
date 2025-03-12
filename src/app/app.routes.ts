import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
export const routes: Routes = [
  // Redirect to 'home' by default
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Auth layout with lazy-loaded standalone components
  {
    path: '',
    component: AuthLayoutComponent,canActivate:[loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forgotpassword',
        loadComponent: () =>
          import('./pages/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
      },
      {
        path: 'verifyRestCode',
        loadComponent: () =>
          import('./pages/verfiypassword/verfiypassword.component').then(
            (m) => m.VerfiypasswordComponent
          ),
      },
      {
        path: 'updatePassword',
        loadComponent: () =>
          import('./pages/updatepassword/updatepassword.component').then(
            (m) => m.UpdatepasswordComponent
          ),
      },
    ],
  },

  // Blank layout with lazy-loaded standalone components
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'cart',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then((a) => a.AllordersComponent),
        title: 'AllOrders',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'categories',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'checkout',
        
      },
      {
        path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(
            (m) => m.DetailsComponent ), title: 'details Product',},
      {
        path: 'detailsCategory/:id', loadComponent: () => import('./pages/details-category/details-category.component').then(
            (m) => m.DetailsCategoryComponent ), title: 'details Category',},
      {
        path: '**',
        component: NotfoundComponent,
        title: 'Not Found',
      },
    ],
  },
];
