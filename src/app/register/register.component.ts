import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  formObj: any;

  constructor(public quizService: QuizService, private route: Router) {
  }

  ngOnInit() {
    const usrDtls = localStorage.getItem('participant') || false;
    this.quizService.questions = [];
    if (!!usrDtls) {
      this.goToQuiz();
    }
  }

  OnSubmit(formObj: any) {
    this.formObj = formObj;
    this.quizService.saveParticipant(formObj.Name, formObj.Email, formObj.Phone, formObj.Category);
    this.goToQuiz();
  }

  goToQuiz() {
    this.quizService.loading = true;
    this.route.navigate(['/quiz']);
  }

}
