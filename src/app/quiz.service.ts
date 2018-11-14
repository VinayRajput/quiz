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
    retry: any;
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
    }

    showTimeElapsed(){
        return Math.floor(this.seconds % 60) +'s' ;
    }
    /*Angular version of getQuestions*/
    /*getQuestions() {
        return this.http.get(this.rootUri);
    }*/

    /*ES6 version of getQuestions*/
    getQuestions() {
        const request = new Request(this.rootUri, {
            headers: new Headers({
                //'Content-Type': 'application/json'
            })
        });

        return fetch(request).then( response => response.text());
    }

    getParticipantName(){
        const userDtls = JSON.parse(localStorage.getItem('participant'));
        return userDtls.Name;
    }

}
