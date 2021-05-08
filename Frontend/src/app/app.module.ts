import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AdminAuthGuard } from './guards/admin-auth.service';
import { AuthGuard } from './guards/auth.service';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';


import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './services/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { AddtowishlistComponent } from './addtowishlist/addtowishlist.component';
import { WishlistComponent } from './wishlist/wishlist.component';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    AddToCartComponent,
    ShoppingCartSummaryComponent,
    AddtowishlistComponent,
    WishlistComponent,
    
  ],
  imports: [
       
    CommonModule, 
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },

      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canLoad: [AdminAuthGuard], 
        canActivate: [AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canLoad: [AdminAuthGuard], 
        canActivate: [AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canLoad: [AdminAuthGuard], 
        canActivate: [AdminAuthGuard] 
      }
    ]) 
  ],
  providers: [
    UserService,
    AuthGuard,
    AdminAuthGuard,
    ProductService,
    ShoppingCartService

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
