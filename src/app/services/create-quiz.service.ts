import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuizQuestionsInitialInterface } from '../interfaces/quiz-questions-initial-interface';

@Injectable({
  providedIn: 'root',
})
export class CreateQuizService {
  head = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Access-Control-Allow-Headers',
      "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization"
    )
    .set(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
  // Direct Injection
  constructor(private http: HttpClient) {}

  // create quiz from api
  createQuiz(
    category: string,
    difficulty: string
  ): Observable<QuizQuestionsInterface[]> {
    let params = {
      amount: 5,
      category: category,
      difficulty: difficulty,
      encode: 'url3986',
    };
    let queryParams: HttpParams = new HttpParams({ fromObject: params });

    return this.http
      .get<QuizQuestionsInitialInterface>('https://opentdb.com/api.php', {
        headers: this.head,
        params: queryParams,
      })
      .pipe(
        map((data) => data.results),
        catchError((err) => {
          throw 'error in quiz creation' + err;
        })
      );
  }
}
