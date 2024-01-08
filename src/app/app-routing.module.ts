import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent,
  // },
  {
    path: '',
    component: LayoutComponent,data : {  
      title: 'CMS - Content Management Service'  
    },
    children: [
      {   path: '',
          component: HomeComponent,data : {  
          title: 'Home | CMS - Content Management Service'  
        }, 
      },
      {   path: 'about-us',
          component: AboutUsComponent,data : {  
          title: 'About Us | CMS - Content Management Service'  
        }, 
      },
      {   path: 'contact-us',
          component: ContactUsComponent,data : {  
          title: 'Contact Us | CMS - Content Management Service'  
        }, 
      },
      {   path: 'services',
          component: ServicesComponent,data : {  
          title: 'Services | CMS - Content Management Service'  
        }, 
      },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      // },
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('./pages/users/users.module').then((m) => m.UsersModule),
      // },
    ]
  },  
  {   path: 'login',
      component: LoginComponent,data : {  
        title: 'Login | CMS - Content Management Service'  
      }, 
  },  
  {
    path: 'register',
    component: RegisterComponent, data : {  
      title: 'Registration | CMS - Content Management Service'  
    }, 
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent, data : {  
      title: 'Forgot Password  | CMS - Content Management Service'  
    }, 
  },
  { 
    path: 'change-password', 
    component: ChangePasswordComponent, data : {  
      title: 'Reset Password  | CMS - Content Management Service'  
    }, 
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
