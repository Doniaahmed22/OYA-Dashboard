import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { __values } from 'tslib';
import { trigger, transition, style, animate } from '@angular/animations';  // استيراد الأنميشن
declare var particlesJS: any;
// import * as particlesJS from 'particles.js';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  
})
export class AuthComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthServicesService, private router: Router) {
    
  }

  ngOnInit(): void {
    // إعداد تأثيرات الخلفية عند تحميل الصفحة
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 150, // عدد النقاط
        },
        color: {
          value: '#fff600', // لون النقاط
        },
        size:{
          value:3
        },
        shape: {
          type: 'circle', // شكل النقاط
        },
        move: {
          enable: true, // تفعيل الحركة
          speed: 4, // سرعة الحركة
        },
        line_linked: {
          color: '#09c', // لون الخطوط المتصلة بين النقاط
        },
      },
      interactivity: {
        events: {
          onhover: {
            enable: true, // تفعيل التفاعل عند مرور الماوس
            mode: 'repulse', // جعل الجسيمات تتباعد عند مرور الماوس
          },
          onclick: {
            enable: true, // تفعيل التفاعل عند النقر
            mode: 'push', // إضافة جسيمات جديدة عند النقر
          },
        },
        modes: {
          repulse: {
            distance: 100, // المسافة التي تتباعد فيها الجسيمات
            duration: 1, // مدة التباعد
          },
          push: {
            particles_nb: 4, // عدد الجسيمات الجديدة عند النقر
          },
        },
      },
    });
  
  }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('accessToken', response.accessToken); // تخزين التوكين
        this.authService.loginService();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
