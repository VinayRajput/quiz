import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizComponent} from './quiz/quiz.component';
import {ResultComponent} from './result/result.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {'path': 'quiz', component: QuizComponent, canActivate:[ AuthGuard]},
    {'path': 'register', component: RegisterComponent },
    {'path': 'result', component: ResultComponent, canActivate:[AuthGuard]},
    {'path': '', redirectTo: '/register', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
