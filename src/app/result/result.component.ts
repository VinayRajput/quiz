import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../quiz.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
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
export class ResultComponent implements OnInit {

  constructor(private route: Router, private quizService: QuizService) { }


  resultText:string;
  startQuizButtonText:string;
  quizCompleted: any;

  ngOnInit() {
    this.quizCompleted = JSON.parse(localStorage.getItem('quizCompleted')) || false;
    if(!this.quizCompleted){
      this.route.navigate(['/regsiter']);
    } else if(!!this.quizCompleted && this.quizCompleted.qAttended > 0){
      this.resultText = 'You got ' + this.quizCompleted.correctAnswer + '/' + this.quizCompleted.qAttended + ' answers right';
      this.startQuizButtonText = 'Start Quiz Again';
    } else {
      this.resultText = 'Oops, seems like you have not attended quiz.';
      this.startQuizButtonText = 'Try Quiz Again';
    }
  }

  startNewQuiz(){
    localStorage.clear();
    this.route.navigate(['/register']);
  }

}
