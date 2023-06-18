import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ListProductsComponent {

  @Output() deleteId = new EventEmitter<any>();

  showAdd = false
  showDelete = false
  deleteConfirmed = false

  id: any

  products: any[] = [
    // { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99 },
    // { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
    // { id: 3, name: 'Product 3', description: 'Description 3', price: 7.99 }
  ];

  constructor(private productService: ProductService) { }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
          console.log(this.products)
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
  }


  ngOnInit() {
    this.getProducts();
  }


  deleteProductId(id: any) {

    this.productService.deleteProduct(id)
      .subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== id);
        },
        err => {
          console.log("Error deleting product", err);
        });


    // const index = this.products.findIndex(product => product.id === id);
    // if (index !== -1) {
    //   // Remove the product from the array
    //   this.products.splice(index, 1);
    // }
  }

  cancelDelete() {
    this.showAdd = false
  }

  openAdd() {
    // this.showAdd != this.showAdd;

    if (this.showAdd == false) {
      this.showAdd = true
    } else {
      this.showAdd = false
    }

  }


  setStatus() {
    this.showDelete = false
  }

  deleteProduct() {

    this.deleteConfirmed = true

    this.deleteProductId(this.id)

    this.showDelete = false
  }

  openDelete(id: any) {
    this.id = id

    this.showDelete = true

    this.deleteId.emit(id)

  }

  addNewProduct(data: any) {
    this.productService.createProduct(data)
      .subscribe(
        product => {
          this.products.push(product);
        },
        err => {
          console.log("Error creating Product: ", err);
        }
      );
    //  this.products.push(data)
    this.showAdd = false
  }
}
