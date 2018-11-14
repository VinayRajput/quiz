import {Component} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {QuizService} from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(private router: Router, public quizService: QuizService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.quizService.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.quizService.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.quizService.loading = false;
    }
    if (event instanceof NavigationError) {
      this.quizService.loading = false;
    }
  }
}
