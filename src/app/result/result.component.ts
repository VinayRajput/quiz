import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
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
