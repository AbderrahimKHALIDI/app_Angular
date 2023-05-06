import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products! :Array<Product>;

  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"computer",price:5000, promotion:true},
      {id:UUID.UUID(),name:"printer",price:444,promotion:false},
      {id:UUID.UUID(),name:"smart phone",price:667,promotion:true}
    ];
    for(let i=0;i<10;i++){
      this.products.push({id:UUID.UUID(),name:"computer",price:5000, promotion:true});
      this.products.push({id:UUID.UUID(),name:"printer",price:444,promotion:false});
      this.products.push( {id:UUID.UUID(),name:"smart phone",price:667,promotion:false});
    }
  }
  public getAllProducts(): Observable<Product[]>{
    let rnd=Math.random();
    if(rnd<0.1) return  throwError(()=> new Error("Internet connexion error"))
    else return of([...this.products]);
  }
  public getPageProducts(page:number,size:number): Observable<PageProduct>{
    let index=page*size;
    let totalPages=~~(this.products.length/size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProduct=this.products.slice(index,index+size);
    return  of({page:page,size:size,totalPages:totalPages,products:pageProduct});
  }
  public deleteProduct(id:string): Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true)
  }
  public setPromotion(id:string): Observable<boolean>{
   let product= this.products.find(p=>p.id==id);
    if(product!=undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }else return  throwError(()=>new Error("product not found"));
  }
  public  searchProducts(keyword:string,page:number,size:number): Observable<PageProduct>{
let result=this.products.filter(p=>p.name.includes(keyword));

    let index=page*size;
    let totalPages=~~(result.length/size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProduct=result.slice(index,index+size);
    return  of({page:page,size:size,totalPages:totalPages,products:pageProduct});
  }
}
