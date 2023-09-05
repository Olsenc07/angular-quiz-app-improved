import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuizQuestionsInitialInterface } from '../interfaces/quiz-questions-initial-interface';


@Injectable({
  providedIn: 'root',
})
export class CreateQuizService {
  // Direct Injection
  constructor(private http: HttpClient) {}
  // create quiz from api
  createQuiz(
    category: string,
    difficulty: string
  ): Observable<QuizQuestionsInterface[]> {
    const params = {
      amount: 5,
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
        map((data: QuizQuestionsInitialInterface) => data.results),
        catchError((err) => {
          throw 'error in quiz creation' + err;
        })
      );
  }
}
