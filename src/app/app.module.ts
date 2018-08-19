import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoutesModule } from './routes.module';
import { GraphsModule } from './graphs/graphs.module';

import { UserService } from './services/user.service';
import { CollectionsService } from './services/collections.service';
import { TypesService } from './services/types.service';
import { ItemsService } from './services/items.service';
import { StatisticsService } from './services/statistics.service';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionFormComponent } from './components/collections/collection-form/collectionForm.component';
import { CollectionDetailsComponent } from './components/collections/collection-details/collectionDetails.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemComponent } from './components/items/item.component';
import { ItemFormComponent } from './components/items/item-form/itemForm.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    CollectionsComponent,
    CollectionFormComponent,
    CollectionDetailsComponent,
    HeaderComponent,
    ItemComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutesModule,
    NgbModule,
    HttpClientModule,
    GraphsModule
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
    TypesService,
    UserService,
    CollectionsService,
    ItemsService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
