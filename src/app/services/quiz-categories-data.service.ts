import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError } from 'rxjs';
import { CategoryDataInterface } from '../interfaces/category-interface';
import { NestedCategoryInterface } from '../interfaces/nested-category-interface';

@Injectable({
  providedIn: 'root',
})
export class QuizCategoriesDataService {
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
  // get category data from api
  getCategoryData(): Observable<CategoryDataInterface[]> {
    return this.http
      .get<NestedCategoryInterface>('https://opentdb.com/api_category.php', {
        headers: this.head,
      })
      .pipe(
        map((data) => data.triviaCategories),
        catchError((err) => {
          throw 'error in request' + err;
        })
      );
  }
}
