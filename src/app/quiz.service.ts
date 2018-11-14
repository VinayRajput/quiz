import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    readonly rootUri = 'https://opentdb.com/api.php?amount=100&difficulty=medium&type=multiple';

    questions: any[];
    seconds: number;
    timer;
    currentQs: number;
    correctAnswer: number;
    quizStarted = false;
    quizMaxTimeInSec = 60;
    retry: any;
    loading = true;
    category = 'Any';
    quizName = 'Trivia Quiz';

    constructor(private http: HttpClient, private route: Router) {
    }

    saveParticipant(name: string, email: string, phone: number, category: string) {
        this.loading = true;
        const body = {
            Name: name,
            Email: email,
            Phone: phone,
            Category: category
        };

        localStorage.clear();
        localStorage.setItem('participant', JSON.stringify(body));
        this.category = category;
        this.quizStarted = true;

    }

    showTimeElapsed() {
        return Math.floor(this.seconds % 60) + 's';
    }

    /*Angular version of getQuestions*/
    /*getQuestions() {
        return this.http.get(this.rootUri);
    }*/

    /*ES6 version of getQuestions*/
    getQuestions() {
        const request = new Request(this.rootUri + '&category=' + this.category, {
            headers: new Headers({
                //'Content-Type': 'application/json'
            })
        });
        return fetch(request).then(response => response.text());
    }

    getParticipantName() {
        const userDtls = JSON.parse(localStorage.getItem('participant'));
        return userDtls.Name;
    }

    SignOut(){
        localStorage.clear();
        clearInterval(this.timer);
        this.route.navigate(['/register']);
    }

}
