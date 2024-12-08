import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetApisService } from 'src/app/services/get-apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,
    MatCardModule, // موديول البطاقات
    MatListModule, // موديول القوائم
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: number = 0;
  user: any;
  constructor(private _GetApisService: GetApisService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    this._ActivatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      }
    })
    this._GetApisService.getUserById(this.id).subscribe({
      next: (response) => {
        console.log(response);

        this.user = response;
      }
    })
  }

  editUser(id: number): void {
    this._Router.navigate(['/edit-User', id]);
  }

  deleteUser(id: number) {
    this._GetApisService.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('User deleted successfully', 'success')
        this._Router.navigate(['/users'])
      }
    })
  }
}


