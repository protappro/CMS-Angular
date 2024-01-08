import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../_helpers/must-match.validator';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private toastr: ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      passwordToken: ['']
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
    
    this.route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(params['token']);
    });
  }
  get f() { return this.changePasswordForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this._userService.resetPassword(this.changePasswordForm.value).subscribe(response => {
      if (response.status) {
        this.toastr.success(response.message, 'Success');
        this.router.navigateByUrl('/login');
      } else {
        this.toastr.error(response.message, 'Error');
      }
    },error => {
      console.log(error.error);
      this.toastr.error(error.error.error, 'Error');
    });
  }
}
