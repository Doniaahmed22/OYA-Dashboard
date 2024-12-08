import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GetApisService } from 'src/app/services/get-apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {

  user: any;
  userId: any;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private _GetApisService: GetApisService, private _Router: Router, private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // تهيئة النموذج مبدئيًا بدون بيانات
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['', Validators.required],
    });
  
    // استدعاء API للحصول على بيانات المستخدم
    this._ActivatedRoute.params.subscribe({
      next: (response) => {
        this.userId = response['id'];
        console.log(this.userId);
      },
    });
  
    this._GetApisService.getUserById(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
  
        // تحديث النموذج بالبيانات المستلمة
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          age: this.user.age,
          email: this.user.email,
          phone: this.user.phone,
          role: this.user.role,
        });
      },
    });
  }
  

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      this._GetApisService.addUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success('User Updated Successfully', 'SUCCESS')
          this._Router.navigate(['/users']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
