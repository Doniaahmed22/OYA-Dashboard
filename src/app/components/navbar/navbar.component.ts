import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService:AuthServicesService){}

  signout():void{
    window.location.reload();
    this.authService.logout();
  }

}


// BrowserModule,
// AppRoutingModule,
// RouterModule,
// BrowserAnimationsModule,
// CarouselModule,
// HttpClientModule,
// FormsModule,
// ToastrModule.forRoot(),
