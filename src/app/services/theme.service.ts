import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = false;

  constructor() {
    // استرجاع السمة المحفوظة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    this.darkMode = true;
  }

  enableLightMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    this.darkMode = false;
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

}
