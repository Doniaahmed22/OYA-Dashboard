import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetApisService } from 'src/app/services/get-apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule], // import form
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{

  constructor( private _GetApisService: GetApisService , private _Router:Router, private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._GetApisService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response;
      }
    })
  }

  product:any = {
    title: '',
    price: 0,
    description: '',
    category: '',
    stock:''
  };
  categories:any;


  onSubmit(form: any): void {
    if (form.valid) {
      this._GetApisService.addNewProduct(this.product).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this._Router.navigate(['/products']); // Redirect to the product list
        },
        error: (err) => {
          console.error('Error adding product:', err);
          // Display an error notification
        }
      });

      // this._Router.navigate(['/products']);
    }
    else{
      console.log("form is not valid");
      
    }

  }

}
