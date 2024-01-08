import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  public loginForm: FormGroup;
  public isAuthLoading = false;
  submitted = false;

  constructor(   
    private renderer: Renderer2,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm () {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  get f() { return this.loginForm.controls; }
  doLogin() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      if(response.status){
        console.log(response.token);
        this.spinner.hide();
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_info', JSON.stringify(response.data[0]));
        
        this.router.navigate(['/']);
        this.toastr.success('You are successfully logged in.', 'Success');
      } else {
        this.spinner.hide();
        this.toastr.error('Your login information is incorrect.', 'Login Failed');
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    } else {
      this.doLogin();
    }
  }

}
