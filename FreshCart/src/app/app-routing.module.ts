import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guard/auth.guard';

const routes: Routes = [
  // Blank
  {path:'',canActivate:[authGuard],loadComponent:()=>import('./Layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
children:[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',loadComponent:()=>import('./Components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
  {path:'cart',loadComponent:()=>import('./Components/cart/cart.component').then((m)=>m.CartComponent),title:'Cart'},
  {path:'wishlist',loadComponent:()=>import('./Components/wishlist/wishlist.component').then((m)=>m.WishlistComponent),title:'WishList'},
  {path:'payment/:id',loadComponent:()=>import('./Components/payment/payment.component').then((m)=>m.PaymentComponent),title:'Payment'},
  {path:'products',loadComponent:()=>import('./Components/products/products.component').then((m)=>m.ProductsComponent),title:'Products'},
  {path:'productDetails/:id',loadComponent:()=>import('./Components/details/details.component').then((m)=>m.DetailsComponent),title:'Product Details'},
  {path:'categories',loadComponent:()=>import('./Components/categories/categories.component').then((m)=>m.CategoriesComponent),title:'Categories'},
  {path:'categoriesDetails/:id',loadComponent:()=>import('./Components/categories-details/categories-details.component').then((m)=>m.CategoriesDetailsComponent),title:'Categories Details'},
  {path:'brands',loadComponent:()=>import('./Components/brands/brands.component').then((m)=>m.default),title:'Brands'},
  {path:'specificbrand/:id',loadComponent:()=>import('./Components/specifisbrand/specifisbrand.component').then((m)=>m.SpecifisbrandComponent), title:'Specific Brand'},
  {path:'allorders',loadComponent:()=>import('./Components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:'All Orders'},
  {path:'forgetPassword',loadComponent:()=>import('./Components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent),title:'Forget Password'}
]},

// Auth
{path:'',loadComponent:()=>import('./Layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
children:[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',loadComponent:()=>import('./Components/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
  {path:'register',loadComponent:()=>import('./Components/register/register.component').then((m)=>m.RegisterComponent),title:'Register'},
  {path:'forget',loadComponent:()=>import('./Components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent),title:'Forget Password'}
]},

// Not found
{path:'**',loadComponent:()=>import('./Components/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
