import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { RoutesModule } from './routes.module';
import { GraphsModule } from './graphs/graphs.module';

import { UserService } from './services/user.service';
import { CollectionsService } from './services/collections.service';
import { TypesService } from './services/types.service';
import { ItemsService } from './services/items.service';
import { StatisticsService } from './services/statistics.service';
import { AlertsService } from './services/alerts.service';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionFormComponent } from './components/collections/collection-form/collectionForm.component';
import { CollectionDetailsComponent } from './components/collections/collection-details/collectionDetails.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemComponent } from './components/items/item/item.component';
import { ItemFormComponent } from './components/items/item-form/itemForm.component';
import { SearchBarComponent } from './components/search/searchBar.component';
import { LoadingComponent } from './components/loading/loading.component';

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
    ItemFormComponent,
    SearchBarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutesModule,
    NgbAlertModule.forRoot(),
    HttpClientModule,
    GraphsModule,
    LoadingBarHttpClientModule
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
    StatisticsService,
    AlertsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
