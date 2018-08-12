import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  authorized: Boolean;
  tokenChanged: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuth();

    this.tokenChanged = this.userService
      .tokenChanged.subscribe(this.checkAuth.bind(this));
  }

  checkAuth() {
    this.authorized = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

  ngOnDestroy() {
    this.tokenChanged.unsubscribe();
  }
}