import {Component, OnInit} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  formObj:any;

  constructor(private quizService: QuizService, private route: Router) {
  }

  ngOnInit() {
    const usrDtls = localStorage.getItem('participant') || false;
    if(!!usrDtls) {
      this.goToQuiz();
    }
  }

  OnSubmit(formObj: any) {
    this.formObj = formObj;
    this.quizService.saveParticipant(formObj.Name, formObj.Email, formObj.Phone);
    this.goToQuiz();
  }
  goToQuiz(){
    this.route.navigate(['/quiz']);
  }

}
