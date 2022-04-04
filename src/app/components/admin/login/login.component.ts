import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  brandForm: FormGroup;

  invalide: any;
  errors = {
    email: '',
    password: '',
  };

  constructor(
    private auth: AdminAuthService,
    private router: Router,
    private tosatr: ToastrService
  ) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  login() {
    this.isLoading = true;

    this.auth.Login(this.brandForm.value.email, this.brandForm.value.password).subscribe(
      (res: any) => {
        if (res.visibility == true) {
          if (res.is_admin == 1) {
            if (res.is_active == 0) {
              this.tosatr.error('Compte administrateur désactivé');
              this.router.navigate(['/site/login']);
            } else {
              localStorage.setItem('user', JSON.stringify(res));
              this.auth.toggleLogin(true);
              this.router.navigate(['/admin/home']);
            }
          } else {
            this.router.navigate(['/site/login']);
          }

        
        } else {
          this.invalide = res.message;
          this.errors.email = '';
          this.errors.password = '';
        }
        console.log(res);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);

        this.errors = err.error.errors;
      }
    );
  }

}
