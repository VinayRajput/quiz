import { Component, OnInit } from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {


  constructor(private route: Router, public quizService: QuizService) { }

  ngOnInit() {
  }

  SignOut(){
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.route.navigate(['/register']);
  }
}