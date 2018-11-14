import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(private route: Router, private quizService: QuizService) {
  }

  ramdomJoininArray(item: any, index: any) {

    const
      arr = item['incorrect_answers'],
      len: number = arr.length,
      // tslint:disable-next-line:radix
      random: number = parseInt(Math.random() * len)
    ;

    let
      jointArray = []
    ;
    jointArray = arr.splice(0, random);
    jointArray.push(item['correct_answer']);
    jointArray = jointArray.concat(arr);

    return jointArray;
  }

  answer(id, choosen) {

    if(this.quizService.questions[id]['correct_answer'] === choosen) {
      this.quizService.correctAnswer++;
    }

    const callbk = function (obj) {
      obj.quizService.currentQs++;
    };
    setTimeout( callbk.bind(null, this ), 300);

  }

  startTimer() {
    const callbk = function (obj) {
      obj.quizService.seconds++;
      if (obj.quizService.seconds > obj.quizService.quizMaxTimeInSec) {
        clearInterval(obj.quizService.timer);
        const quizCompleted = {qAttended:obj.quizService.currentQs, correctAnswer:obj.quizService.correctAnswer};
        localStorage.setItem('quizCompleted', JSON.stringify(quizCompleted));
        obj.route.navigate(['/result']);
      }
    };
    this.quizService.timer = setInterval(callbk.bind(null, this), 1000);
  }


  ngOnInit() {
    this.quizService.seconds = 0;
    this.quizService.currentQs = 0;
    this.quizService.correctAnswer = 0;

    if (localStorage.getItem('quizCompleted')) {
      this.route.navigate(['/result']);
    }


    this.quizService.getQuestions().subscribe(
      (data: any) => {
        const callbk = function (obj: any, item: any, index: any) {
          item['options'] = obj.ramdomJoininArray(item);
        };
        this.quizService.questions = data.results;
        this.quizService.questions.map(callbk.bind(null, this));
        this.startTimer();
      });
  }


}
