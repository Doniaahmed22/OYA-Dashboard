// import { GetApisService } from './../../services/get-apis.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetApisService } from 'src/app/services/get-apis.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CuttextPipe } from 'src/app/pipes/cuttext.pipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';  // استيراد MatIconModule
import { MatMenuModule } from '@angular/material/menu';  // استيراد MatMenuModule
import { MatButtonModule } from '@angular/material/button'; // استيراد MatButtonModule
import { MatSelectModule } from '@angular/material/select'; // استيراد MatSelectModule
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CuttextPipe, MatTableModule, MatPaginatorModule, ReactiveFormsModule,
    MatIconModule, // إضافة MatIconModule
    MatMenuModule, // إضافة MatMenuModule
    MatButtonModule, // إضافة MatButtonModule
    MatSelectModule, // إضافة MatSelectModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // يبدأ المكون بشفافية 0 وتحريك لأسفل
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' })), // يظهر تدريجيا
      ]),
    ]),
  ],
})
export class ProductsComponent {

  displayedColumns: string[] = ['thumbnail', 'title', 'price', 'stock', 'category', 'action'];
  dataSource: any[] = [];
  totalItems = 0; // العدد الكلي للمنتجات
  pageSize = 10; // عدد العناصر في الصفحة الواحدة
  searchControl = new FormControl;




  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _GetApisService: GetApisService, private _Router: Router, private _ToastrService: ToastrService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchWord) => this._GetApisService.searchProduct(searchWord))
      )
      .subscribe({
        next: (response) => {
          this.dataSource = response.products;
          this.totalItems = response.total;
        },
      });
  }


  ngOnInit(): void {
    this.loadProducts(0, this.pageSize); // جلب البيانات للصفحة الأولى
  }

  // جلب البيانات حسب الصفحة
  loadProducts(skip: number, limit: number): void {
    this._GetApisService.getAllProducts(limit, skip).subscribe((response: any) => {
      this.dataSource = response.products; // البيانات للجدول
      this.totalItems = response.total;   // العدد الكلي للمنتجات
    });
  }

  // التعامل مع تغيير الصفحة
  onPageChange(event: any): void {
    const skip = event.pageIndex * event.pageSize;
    this.loadProducts(skip, event.pageSize);
  }

  addProduct(): void {
    this._Router.navigate(['/add-product'])
  }

  editProduct(id: number): void {
    this._Router.navigate(['/edit-product', id], { queryParams: { source: 'products' } });
  }

  deleteProduct(id: number) {
    this._GetApisService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('product deleted successfully', 'success')

      }
    })
  }

  productDetails(id: number): void {
    this._GetApisService.getSpecificProduct(id).subscribe({
      next: () => {
        this._Router.navigate(['/product-details', id])
      }
    })
  }

  applyFilter(sortBy: string, order: string): void {
    this._GetApisService.filterProducts({ sortBy, order }).subscribe({
      next: (response) => {
        this.dataSource = response.products; // تحديث البيانات بناءً على الفلترة
      },
      error: (err) => {
        console.error('Error fetching filtered data:', err);
      },
    });
  }


}
