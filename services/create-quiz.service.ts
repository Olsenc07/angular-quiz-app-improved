import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, of, takeUntil, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuizQuestionsInitialInterface } from '../interfaces/quiz-questions-initial-interface';


@Injectable({
  providedIn: 'root',
})
export class CreateQuizService {
   // Cache to store initial questions
   private initialQuestions: QuizQuestionsInterface[] = [];
   // Subject for unsubscribing
  private unsubscribe$: Subject<void> = new Subject<void>();
  // Direct Injection
  constructor(private http: HttpClient) {}
  // create quiz from api
  createQuiz(
    // category is id
    category: string,
    difficulty: string,
    numberOfQuestions: number
  ): Observable<QuizQuestionsInterface[]> {
    const params = {
      amount: numberOfQuestions,
      category: category,
      difficulty: difficulty,
      encode: 'url3986',
    };
    const queryParams: HttpParams = new HttpParams({ fromObject: params });
    return this.http
      .get<QuizQuestionsInitialInterface>('https://opentdb.com/api.php', {
        params: queryParams,
      })
      .pipe(
        // using swtichMap because i'm jumping between observable different sequences
        switchMap((data: QuizQuestionsInitialInterface) => {
        if(numberOfQuestions > 1){
          // store these values
          this.initialQuestions = data.results;
          // of creates an observable
         return of(data.results)
        }else{
        // only return if it's one of the same questions or make call again
         const newQuestion: QuizQuestionsInterface = data.results[0];
        if(this.initialQuestions.some((q: QuizQuestionsInterface) => 
        q.question === newQuestion.question)){
          // redue request
        return this.createQuiz(category, difficulty, 1);
        }else{
            // Add the new question to the cache and return it
            this.initialQuestions.push(newQuestion);
          // of creates an observable
            return of(data.results);
        }
        }
      }),
      catchError((err) => {
        throw 'error in quiz creation' + err;
      }),
      // Unsubscribe when needed
      takeUntil(this.unsubscribe$) 
    );
  }
  // Clean Up, unsubscribe when it's no longer needed
unsubscribe(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
