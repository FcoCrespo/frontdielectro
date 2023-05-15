import { HostListener, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.scss']
})
export class RecoverpassComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success!: string;
  isDesktop: boolean = false;

  emailvalue: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {
    // redirige al inicio si ya estás logueado
    //this.checkLogin();
  }


  ngOnInit() {



    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });


    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isDesktop = !result.matches;
    });

  }

  // getter para obtener los controles del form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    var usernameinput = (<HTMLInputElement>document.getElementById('username')).value;
    var emailinput = (<HTMLInputElement>document.getElementById('email')).value;

    console.log(usernameinput + " " + emailinput)
    var strongRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    if (usernameinput === ''
      || usernameinput === undefined
      || emailinput === ''
      || emailinput === undefined) {


      alert("Algunos campos para recuperar tu contraseña estan vacíos.")

    }

    else {

      if (strongRegex.test(emailinput)) {
        document.getElementById('botonRecover')!.setAttribute("disabled", "disabled");
        this.submitted = true;

        // resetea las alarmas al acceder
        this.error = "";
        this.success = "";

        this.userService.recoverpassword(this.f.username.value, this.f.email.value)
          .subscribe(
            data => {
              console.log(data);
              alert("Una nueva contraseña ha sido enviada al correo del usuario indicado.");
              this.router.navigate(['/login']);
            },
            error=>{
              alert("Una nueva contraseña ha sido enviada al correo del usuario indicado.");
              this.router.navigate(['/login']);
            }
            
          );

      }
      else {
        alert("El email proporcionado no se encuentra en el formato correcto (...@...)");
        this.emailvalue = '';
      }
    }


  }

  GoToLogin() {
    this.router.navigate(['/login']);
  }




}