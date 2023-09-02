import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError } from 'rxjs';
import { CategoryDataInterface } from '../interfaces/category-interface';
import { NestedCategoryInterface } from '../interfaces/nested-category-interface';

@Injectable({
  providedIn: 'root',
})
export class QuizCategoriesDataService {
  // Direct Injection
  constructor(private http: HttpClient) {}
  // get category data from api
  getCategoryData(): Observable<CategoryDataInterface[]> {
    return this.http
      .get<NestedCategoryInterface>('https://opentdb.com/api_category.php')
      .pipe(
        map((data: NestedCategoryInterface) => data.trivia_categories),
        catchError((err) => {
          throw 'error in request' + err;
        })
      );
  }
}
