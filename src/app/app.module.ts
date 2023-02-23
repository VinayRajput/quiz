import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {QuizComponent} from './quiz/quiz.component';
import {ResultComponent} from './result/result.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuizService} from './quiz.service';
import {AuthGuard} from './auth/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        NavbarComponent,
        QuizComponent,
        ResultComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [QuizService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}