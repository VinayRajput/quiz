import { Component, OnInit } from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        style({opacity: 0}),
        animate(400)
      ]),
      transition('* => void', [
        animate(100)
      ])
    ])
  ]
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
