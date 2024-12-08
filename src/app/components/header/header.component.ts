import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   *
   */

  head: string = 'Home';
  token: any = localStorage.getItem('accessToken');
  fullname: string = '';
  img: string = '';
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, public themeService: ThemeService, private authService: AuthServicesService) { }
  ngOnInit(): void {
    // Extract the route path from the URL
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.head = this.extractComponentName(currentUrl);
    });
    //  this.token = localStorage.getItem('accessToken');
    console.log(this.token);
    this.getUserData();
  }

  extractComponentName(url: string): string {
    const segments = url.split('/');

    return segments[1]?.charAt(0).toUpperCase() + segments[1]?.slice(1);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }


  getUserData() {
    this.authService.getUser(this.token).subscribe({
      next: (response) => {
        console.log("response : " , response);
        this.fullname = response.firstName +' '+response.lastName ;
        this.img = response.image

      }
    })
  }

}
