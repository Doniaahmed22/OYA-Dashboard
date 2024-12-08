import { GetApisService } from './../../services/get-apis.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // يبدأ المكون بشفافية 0 وتحريك لأسفل
        animate('1.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' })), // يظهر تدريجيا
      ]),
    ]),
  ],
})
export class CategoriesComponent {
  categories: any[] = []; // لتخزين الفئات

  constructor(private _GetApisService: GetApisService,private _Router:Router,private _ToastrService:ToastrService) {}

  ngOnInit() {
    // تحميل الفئات من API
    this._GetApisService.getCategories().subscribe({
      next: (categories: any[]) => {  // تحديد نوع المتغير categories كمصفوفة أي نوع
        this.categories = categories.map(category => ({
          ...category,
          isOpen: false,
          products: []
        }));
      },
      
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  toggleProducts(category: any): void {
    if (category.isOpen) {
      // إغلاق الفئة إذا كانت مفتوحة
      category.isOpen = false;
      category.products = []; // مسح المنتجات
    } else {
      // فتح الفئة المحددة
      category.isOpen = true;
      // جلب المنتجات الخاصة بالفئة
      this._GetApisService.getProductUnderCategories(category.url).subscribe({
        next: (response) => {
          if (Array.isArray(response.products)) {
            category.products = response.products; // تخزين المنتجات الخاصة بالفئة
          } else {
            category.products = [];
          }
        },
        error: (err) => {
          console.error('Failed to load products:', err);
          category.products = [];
        }
      });
    }
  }

  editProduct(id: number): void {
    this._Router.navigate(['/edit-product', id], { queryParams: { source: 'categories' }});
  }

  deleteProduct(id: number) {
    this._GetApisService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('product deleted successfully','success')

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
