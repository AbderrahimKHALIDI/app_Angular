import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product> ;
  errorMessage!:string;
  constructor( private productService : ProductService) {

  }
  ngOnInit():void {
this.handeleGetAllProducts();
  }
handeleGetAllProducts(){
  this.productService.getAllProducts().subscribe({
    next:(data)=>{
      this.products=data;
      console.log(this.products)
    },
    error:(err)=>{
      this.errorMessage=err;
    }
  });
}
  handleDeleteProduct(p: any) {
    let conf=confirm("Are you sure?");
    if(!conf) return;
 this.productService.deleteProduct(p.id).subscribe({
   next:(data)=>{
     //this.handeleGetAllProducts();
     let index=this.products.indexOf(p);
     this.products.splice(index,1);
   }
 })
  }

  handlePromotion(p: Product) {
this.productService.setPromotion(p.id).subscribe({
  next:(data)=>{

    p.promotion=true;
  },
  error:err=>{
    this.errorMessage=err;
    }
})

  }
}
