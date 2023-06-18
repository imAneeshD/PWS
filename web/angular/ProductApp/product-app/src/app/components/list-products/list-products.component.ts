import { Component, EventEmitter, Output } from '@angular/core';

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

  id:any

  products: any[] = [
    // { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99 },
    // { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
    // { id: 3, name: 'Product 3', description: 'Description 3', price: 7.99 }
  ];

  deleteProductId(id:any){
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      // Remove the product from the array
      this.products.splice(index, 1);
    }
  }

  cancelDelete(){
    this.showAdd=false
  }

  openAdd(){
    if(this.showAdd==false){
      this.showAdd=true
    }else{
      this.showAdd=false
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
    this.id=id

    this.showDelete = true

    this.deleteId.emit(id)

  }

  addNewProduct(data:any){
    this.products.push(data)
    this.showAdd=false
  }
}
