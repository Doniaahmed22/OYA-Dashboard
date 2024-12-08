import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GetApisService } from 'src/app/services/get-apis.service';
import { CuttextPipe } from 'src/app/pipes/cuttext.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule,CuttextPipe],
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit{

  userCartId:number = 0;
  userCart:any;
  constructor(private _ActivatedRoute:ActivatedRoute , private _GetApisService:GetApisService ,private _Router:Router , private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next:(response)=>{
        this.userCartId = response['id'];
        this._GetApisService.getUserCart(this.userCartId).subscribe({
          next:(response)=>{
            console.log("response.carts : ", response.carts);
            this.userCart = response.carts[0];
            console.log("this.userCart : ", this.userCart);
            
            
          }
        })
      }
    })
  }

  // editProduct(id: number): void {
  //   this._Router.navigate(['/edit-product', id], { queryParams: { source: 'carts' } });
  // }

  // deleteProduct(id: number) {
  //   this._GetApisService.deleteProduct(id).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this._ToastrService.success('product deleted successfully', 'success')

  //     },
  //     error: (err) => {
  //       console.log(err);

  //     }
  //   })
  // }
}
