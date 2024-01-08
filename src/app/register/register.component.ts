import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';
import { MustMatch } from '../_helpers/must-match.validator';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public submitted = false;
  public validatorAlert = false;
  public token: string|undefined;
  siteKey: string = environment.recaptcha.siteKey;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    this.token = undefined;
   }

  ngOnInit() {
    this.initRegisterForm();
  }  
  
  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
     first_name: ["", [Validators.required, Validators.maxLength(255)]],
     last_name: ["", [Validators.required, Validators.maxLength(255)]],
     email: ["", [Validators.required, Validators.email, Validators.maxLength(255)]],
     phone: ["", [Validators.required, Validators.maxLength(12)]], 
     password: ["", [Validators.required, Validators.minLength(6)]],
     confirm_password: ["", [Validators.required, Validators.minLength(6)]],
     recaptcha: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid) {
      this.toastr.error('All fields are mandatory please fill out the required information.', 'Registration Form');
      return;
    } else {
      this.spinner.show();
      this.userService.createUser(this.registerForm.value).subscribe((response) => {
        if (response.status) {
          this.spinner.hide();
          this.router.navigateByUrl('/login');
          this.toastr.success(response.message, 'Success');
        } else {
          this.spinner.hide();
          this.toastr.error(response.message, 'Error');
        }
      });
    }
    console.debug(`Token [${this.token}] generated`);
  }
  ngOnDestroy() {
    
  }
}
