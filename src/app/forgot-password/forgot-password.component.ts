import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup;
  public submitted = false;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.initForgotPasswordForm();
  }
  initForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }
  get f() { return this.forgotPasswordForm.controls; }
  onSubmit() {
    // this.spinner.show();
    this.submitted = true;

    if(this.forgotPasswordForm.invalid){
      this.toastr.error('Please check all fields', 'Forgot Password');
      return;
    } else {
      this.userService.sendPasswordLink(this.forgotPasswordForm.value).subscribe((response) => {
        if(response.status){
          // this.spinner.hide();
          this.toastr.success(response.message, 'Forgot Password')
        } else {
          // this.spinner.hide();
          this.toastr.error(response.message, 'Forgot Password')
        }
      })
    }
  }

  ngOnDestroy(): void {    
  }
  
}
