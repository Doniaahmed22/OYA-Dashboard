import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GetApisService } from 'src/app/services/get-apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,
    MatCardModule, // موديول البطاقات
    MatListModule, // موديول القوائم
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id: number = 0;
  product: any;
  displayedColumns: string[] = ['reviewer', 'rating', 'comment'];

  constructor(private _GetApisService: GetApisService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _ToastrService:ToastrService) { }

  ngOnInit(): void {

    this._ActivatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      }
    })
    this._GetApisService.getSpecificProduct(this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response;
      }
    })
  }

  editProduct(id: number): void {
    this._Router.navigate(['/edit-product', id], { queryParams: { source: 'products' } });
  }

  deleteProduct(id: number) {
    this._GetApisService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('product deleted successfully', 'success')
        this._Router.navigate(['/products'])
      }
    })
  }

}



