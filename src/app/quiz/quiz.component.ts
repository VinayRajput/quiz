import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        style({opacity: 0}),
        animate(400)
      ])
    ])
  ]
})
export class QuizComponent implements OnInit {

  loadingError = false;
  errorMessage: string;

  constructor(private route: Router, public quizService: QuizService) {
  }

  ramdomJoininArray(item: any, index: any) {

    const
      arr = item['incorrect_answers'],
      len: number = arr.length,
      // tslint:disable-next-line:radix
      rand = Math.round(Math.random() * len)
    ;

    let
      jointArray = []
    ;
    jointArray = arr.splice(0, rand);
    jointArray.push(item['correct_answer']);
    jointArray = jointArray.concat(arr);

    return jointArray;
  }

  answer(id, choosen) {

    if (this.quizService.questions[id]['correct_answer'] === choosen) {
      this.quizService.correctAnswer++;
    }

    const callbk = function (obj) {
      obj.quizService.currentQs++;
    };
    setTimeout(callbk.bind(null, this), 300);

  }

  startTimer() {
    const callbk = function (obj) {
      obj.quizService.seconds++;
      if (obj.quizService.seconds > obj.quizService.quizMaxTimeInSec) {
        clearInterval(obj.quizService.timer);
        const quizCompleted = {qAttended: obj.quizService.currentQs, correctAnswer: obj.quizService.correctAnswer};
        localStorage.setItem('quizCompleted', JSON.stringify(quizCompleted));
        obj.route.navigate(['/result']);
      }
    };
    this.quizService.timer = setInterval(callbk.bind(null, this), 1000);
  }


  ngOnInit() {
    this.quizService.loading = true;
    this.quizService.seconds = 0;
    this.quizService.currentQs = 0;
    this.quizService.correctAnswer = 0;

    if (localStorage.getItem('quizCompleted')) {
      this.route.navigate(['/result']);
    }

    this.startQuiz();
    this.quizService.retry = this.retry;
    /*Angular version*/
    /*
    this.quizService.getQuestions().subscribe(
    (data: any) => {
      const callbk = function (obj: any, item: any, index: any) {
        item['options'] = obj.ramdomJoininArray(item);
      };
      this.quizService.questions = data.results;
      this.quizService.questions.map(callbk.bind(null, this));
      this.startTimer();
    });*/
  }

  startQuiz() {
    this.quizService.getQuestions()
      .then(response => {
        this.loadingError = false;
        const callbk = function (obj: any, item: any, index: any) {
          item['options'] = obj.ramdomJoininArray(item);
        };
        this.quizService.questions = JSON.parse(response).results;
        if (this.quizService.questions.length > 0) {
          this.quizService.questions.map(callbk.bind(null, this));
          this.quizService.loading = false;
          this.startTimer();
        } else {
          throw new Error('No Question');
        }

      })
      .catch(err => {
        this.loadingError = true;
        this.quizService.loading = false;
        if(err.message === 'No Question') {
          this.errorMessage = 'Oops! No Question found, Sign Out and try any other category';
          return;
        } else {
          this.errorMessage = 'Oops! Seems like some network problem, please try after some time.';
          return;
        }
      });
  }

  retry() {
    this.loadingError = false;
    this.quizService.loading = true;
    this.startQuiz();
  }



}
