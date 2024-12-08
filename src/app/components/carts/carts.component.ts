import { GetApisService } from './../../services/get-apis.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carts } from 'src/app/interfaces/carts';
import { Root } from 'src/app/interfaces/root';
import { CuttextPipe } from 'src/app/pipes/cuttext.pipe';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
  CuttextPipe],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // يبدأ المكون بشفافية 0 وتحريك لأسفل
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' })), // يظهر تدريجيا
      ]),
    ]),
  ],
})
export class CartsComponent {
  userCart: any; // لتخزين الفئات
  userId: number = 0;
  User: any;
  constructor(private _GetApisService: GetApisService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit() {
    this._GetApisService.getCarts().subscribe({
      next: (response: Root) => {
        console.log(response);
        if (response.carts && Array.isArray(response.carts)) {
          this.userCart = response.carts.map(cartItem => ({
            ...cartItem,
            isOpen: false,
            products: cartItem.products
          }));

        } else {
          console.error('Invalid response format:', response);
        }

        console.log(this.userCart);
      },

      error: (err) => {
        console.error('Failed to load carts:', err);
      }
    });
  }


  toggleProducts(carts: any): void {
    if (carts.isOpen) {
      carts.isOpen = false;
    } else {
      carts.isOpen = true;
    }
  }


  editProduct(id: number): void {
    this._Router.navigate(['/edit-product', id], { queryParams: { source: 'carts' } });
  }

  deleteProduct(id: number) {
    this._GetApisService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('product deleted successfully', 'success')

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
