import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable يمكن الاشتراك به
  constructor(private http:HttpClient) { }

  
  // تحديث حالة تسجيل الدخول
  loginService(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
      expiresInMins: 200,
    };

    return this.http.post(`https://dummyjson.com/auth/login`, body);
  }





  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }




  getUser(token: string): Observable<any> {
    return this.http.get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



}














// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthServicesService {
//   private isLoggedInSubject = new BehaviorSubject<boolean>(
//     this.isAuthenticated()
//   );

//   isLoggedIn$ = this.isLoggedInSubject.asObservable(); // يمكن الاشتراك به لمتابعة حالة تسجيل الدخول

//   constructor(private http: HttpClient) {}

//   /**
//    * تسجيل الدخول
//    * @param username اسم المستخدم
//    * @param password كلمة المرور
//    */
//   login(username: string, password: string): Observable<any> {
//     const body = {
//       username: username,
//       password: password,
//       expiresInMins: 200,
//     };

//     return this.http.post(`https://dummyjson.com/auth/login`, body).pipe(
//       tap((response: any) => {
//         if (response?.accessToken) {
//           localStorage.setItem('authToken', response.accessToken);
//           localStorage.setItem('isLoggedIn', 'true');
//           this.isLoggedInSubject.next(true);
//         }
//       }),
//       catchError((error) => {
//         console.error('Login failed:', error);
//         return throwError(() => new Error('Login failed'));
//       })
//     );
//   }

//   /**
//    * تسجيل الخروج
//    */
//   logout(): void {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('isLoggedIn');
//     this.isLoggedInSubject.next(false);
//   }

//   /**
//    * جلب بيانات المستخدم
//    * @param token رمز المصادقة
//    */
//   getUser(token: string): Observable<any> {
//     return this.http.get('https://dummyjson.com/auth/me', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

//   /**
//    * التأكد من صحة تسجيل الدخول
//    */
//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('authToken');
//     return !!token && !this.isTokenExpired(token);
//   }

//   /**
//    * التحقق من انتهاء صلاحية التوكن
//    * @param token رمز المصادقة
//    */
//   private isTokenExpired(token: string): boolean {
//     try {
//       const expiry = JSON.parse(atob(token.split('.')[1])).exp;
//       return Math.floor(new Date().getTime() / 1000) >= expiry;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return true; // إذا حدث خطأ، اعتبر التوكن غير صالح
//     }
//   }

//   /**
//    * تهيئة حالة تسجيل الدخول عند تحميل التطبيق
//    */
//   initializeLoginStatus(): void {
//     const isLoggedIn = this.isAuthenticated();
//     this.isLoggedInSubject.next(isLoggedIn);
//   }
// }
