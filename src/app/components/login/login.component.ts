import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  error: Boolean = false;
  loginForm: FormGroup;
  message: String;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).then((user) => {
      this.error = false;
      this.message = '';

      this.router.navigate(['/dashboard']);
    }).catch((e) => {
      if(e.status === 404) {
        this.message = 'User or email not correct';
        this.error = true;
      }
    })
  }
}
