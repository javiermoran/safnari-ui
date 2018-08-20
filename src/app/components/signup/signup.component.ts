import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../../models/user.model';
import { UserService } from "../../services/user.service";
import { Response } from '@angular/http';
import { AlertsService } from "../../services/alerts.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  password: String;
  message: String = '';
  error: Boolean = false;
  success: Boolean = false;

  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'passwordconfirm': new FormControl('', [Validators.required, this.passwordMatch.bind(this)])
    });
  }

  passwordMatch(control: FormControl): {[s: string]: boolean} {
    if(this.password !== control.value) {
      return {'passwordmatch': true};
    }
    
    return null;
  }

  submit() {
    const { username, email, password, picture } = this.signUpForm.value;
    const newUser = new User(username, email, password, picture);
    
    this.userService.registerUser(newUser)
      .subscribe((response: Response) => {
          const username = response.json().username;
          //this.message = `The user ${username} has been succesfully registered`;
          this.success = true;
          this.error = false;
          this.router.navigate(['login']);
        }, (e) => {
          this.message = e.json().error.message;
          this.error = true;          
        }
      );
  }
}