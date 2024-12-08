import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "./components/header/header.component";
import { AuthComponent } from './components/auth/auth.component';
import { AuthServicesService } from './services/auth-services.service';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavbarComponent,
    HeaderComponent,
    AuthComponent
  ],
  
})
export class AppComponent implements OnInit{
  title = 'product-dashboard';
  isLoggedIn = false;
  homeReady = false;

  isOpen: boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 768; // للتحقق من حجم الشاشة

  constructor(private _ToastrService: ToastrService, private router : Router, private authService:AuthServicesService) {
    this.isSmallScreen = window.innerWidth <= 768;
    if (!this.isSmallScreen) {
      this.isOpen = true; // اجعل الـ sidebar مفتوحًا دائمًا عند الشاشات الكبيرة
    }

    else {
      this.isOpen = false; // اجعل الـ sidebar مفتوحًا دائمًا عند الشاشات الكبيرة
    }
       // مزامنة الحالة من localStorage
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedLoginStatus === 'true';
  
  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        
        this.router.navigate(['/home']); // توجيه إلى الصفحة الرئيسية
        if (this.isSmallScreen) {
          this.isOpen = false; // أغلق الـ sidebar إذا كانت الشاشة صغيرة
        }
      } else {
        this.router.navigate(['/login']); // توجيه إلى صفحة تسجيل الدخول
        // this.isOpen = false; // أغلق الـ sidebar عند تسجيل الخروج

      }
    });
    
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  // تحديث حالة الشاشة عند تغيير الحجم
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = event.target.innerWidth <= 768;
    if (!this.isSmallScreen) {
      this.isOpen = true; // اجعل الـ sidebar مفتوحًا دائمًا عند الشاشات الكبيرة
    }

    else {
      this.isOpen = false; // اجعل الـ sidebar مفتوحًا دائمًا عند الشاشات الكبيرة
    }
  }

  onHomeReady(): void {
    this.homeReady = true;
  }

}
