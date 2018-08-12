import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './services/user.service';
import { TypeService } from './services/type.service';
import { CollectionsService } from './services/collections.service';

import { RoutesModule } from './routes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionFormComponent } from './components/collections/collection-form/collectionForm.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    CollectionsComponent,
    CollectionFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutesModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    UserService,
    TypeService,
    CollectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
