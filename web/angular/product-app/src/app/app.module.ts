import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { DeleteProductsComponent } from './components/delete-products/delete-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddProductsComponent,
    ListProductsComponent,
    DeleteProductsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
