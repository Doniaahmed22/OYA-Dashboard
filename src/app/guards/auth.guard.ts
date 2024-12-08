import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService); // حقن الخدمة
  const router = inject(Router); // حقن الـ Router

  if (authService.isLoggedIn$) {
    console.log("authService.isLoggedIn$ : " , authService.isLoggedIn$);
    
    return true; // السماح بالوصول إذا كان المستخدم مسجل الدخول
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // إعادة التوجيه إلى صفحة تسجيل الدخول
    return false; // منع الوصول
  }
};
