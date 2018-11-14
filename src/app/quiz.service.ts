import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    readonly rootUri = 'https://opentdb.com/api.php?amount=100&category=9&difficulty=medium&type=multiple';

    questions: any[];
    seconds: number;
    timer;
    currentQs: number;
    correctAnswer: number;
    quizStarted: boolean = false;
    quizMaxTimeInSec = 5;
    quizName= 'Trivia Quiz';

    constructor(private http: HttpClient) {
    }

    saveParticipant(name: string, email: string, phone: number) {
        const body = {
            Name: name,
            Email: email,
            Phone : phone
        };

        localStorage.clear();
        localStorage.setItem('participant', JSON.stringify(body));

        this.quizStarted = true;

        return this.getQuestions();
    }

    showTimeElapsed(){
        return Math.floor(this.seconds % 60) +'s' ;
    }

    getQuestions() {
        return this.http.get(this.rootUri);
    }



    getParticipantName(){
        const userDtls = JSON.parse(localStorage.getItem('participant'));
        return userDtls.Name;
    }

}
