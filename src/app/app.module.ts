import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxSpinnerModule} from 'ngx-spinner'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { customNotifierOptions } from './helpers/settingsNotifier';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { LayoutsModule } from './components/layouts/layouts.module';



library.add(fas);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxSpinnerModule,
    LayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
