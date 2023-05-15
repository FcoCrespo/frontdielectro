import { HostListener, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success!: string;
  isDesktop: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    // redirige al inicio si ya estás logueado
    //this.checkLogin();
  }


  ngOnInit() {

    document.body.classList.add('bg-img');
    //esto desloguea el usuario antes de empezar el proceso
    this.authService.logout();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isDesktop = !result.matches;
    });

  }

  // getter para obtener los controles del form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    document.getElementById('botonAcceso')!.setAttribute("disabled", "disabled");
    this.submitted = true;

    // resetea las alarmas al acceder
    this.error = "";
    this.success = "";

    // para si el form es inválido
    if (this.loginForm.invalid) {
      document.getElementById('botonAcceso')!.removeAttribute("disabled");
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          /*switch (this.authService.currentUserValue.role) {
            case "admin": {
              this.router.navigate(['/repos']);
              break;
            }
          }*/
          
          //alert("Usuario correcto");
          this.router.navigate(['/home']);
          //location.reload();
          //this.router.navigate(['/repos']);
        },
        error => {
          document.getElementById('botonAcceso')!.removeAttribute("disabled");
          alert("Usuario o contraseña incorrectos.");
          const usernameField = document.getElementById('username');

          if (usernameField instanceof HTMLInputElement) {
            usernameField.value = '';
            usernameField.focus();
          }

          const passField = document.getElementById('password');

          if (passField instanceof HTMLInputElement) {
            passField.value = '';
          }
          this.loading = false;
        });
  }

  checkLogin() {
    if (this.authService.currentUserValue) {
      /*switch (this.authService.currentUserValue.role) {
        case "admin": {
          this.router.navigate(['/repos']);
          break;
        }
      }*/
      alert("Usuario correcto");
      //this.router.navigate(['/repos']);
    }
    
  }

  goRecover(){
    this.router.navigate(['/recoverpass']);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
