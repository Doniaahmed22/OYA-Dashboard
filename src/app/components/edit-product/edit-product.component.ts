import { GetApisService } from '../../services/get-apis.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit{
  productId:number = 0;
  source:string = 'products';
  product:any={};
  EditProduct:any;
  constructor(private _ActivatedRoute:ActivatedRoute, private _GetApisService: GetApisService , private _Router:Router, private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.productId = params['id']; // استلام الـ id
      console.log('this.source:', this.source);
    });

    this._ActivatedRoute.queryParams.subscribe(params => {
      this.source = params['source'] || 'products'; // قراءة source
    });

    this._GetApisService.getSpecificProduct(this.productId).subscribe({
      next:(response)=>{
        this.product = response ;

        this.EditProduct = {
          title: this.product.title,
          price: this.product.price,
          description: this.product.description,
          category: this.product.category,
          stock:this.product.stock
        };
      }
    })
  }



  onSubmit(form: any): void {
    if (form.valid) {
      this._GetApisService.updateProduct(this.productId, this.EditProduct).subscribe({
        next: (response) => {
          console.log('Product updated successfully:', response);
          console.log(this.source);
          
          if(this.source === 'products'){
            this._Router.navigate(['/products']); // Redirect to the product list
          }
          else if(this.source === 'categories'){
            this._Router.navigate(['/categories']); // Redirect to the product list
          }
          else if(this.source === 'carts'){
            this._Router.navigate(['/user-carts']); // Redirect to the product list
          }
        },
        error: (err) => {
          console.error('Error updating product:', err);
          // Display an error notification
        }
      });
    }

    this._ToastrService.success('Product updated successfully', 'Success');
    // this._Router.navigate(['/products']);
  }

}
