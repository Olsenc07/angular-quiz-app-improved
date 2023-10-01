import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, filter, Observable, catchError, shareReplay } from 'rxjs';
import { CategoryDataInterface } from '../interfaces/category-interface';
import { NestedCategoryInterface } from '../interfaces/nested-category-interface';

@Injectable({
  providedIn: 'root',
})
export class QuizCategoriesDataService {
  private categories$: Observable<CategoryDataInterface[]> | null = null;
  private subList: CategoryDataInterface[] = [];
  
  // Direct Injection
  constructor(private http: HttpClient) {}
  // get category data from api
  getCategoryData(): Observable<CategoryDataInterface[]> {
    if (!this.categories$) {
      this.categories$ = this.http
        .get<NestedCategoryInterface>('https://opentdb.com/api_category.php')
        .pipe(
          map((data: NestedCategoryInterface) => this.transform(data.trivia_categories)
          // alphabetical order
          .sort((a, b) => (a.name > b.name) ? 1 : -1)),
          shareReplay(1),
          catchError((err) => {
            throw 'error in category request' + err;
          })
        );
    }
    return this.categories$;
  }


  getSubCategoryData(category: string): Observable<CategoryDataInterface[]> {
    const filteredSubCategory = of(this.subList).pipe(
      map(options => options!.filter((item) => {
       return item.name.startsWith(category)
      })))

  return filteredSubCategory
  }
  // create two arrays that have sub options and then 
  // display those if either of their options are chosen
// when making new list just need to keep id the same for sub categories
  private transform(categories: CategoryDataInterface[]): CategoryDataInterface[] {
    const noRepeats: CategoryDataInterface[] = [];
    for (const cat of categories) {
      // Check for subCategories
    if (cat.name.includes(':')) {
      this.subList.push({
        id: cat.id, name: cat.name
      })
      // only push if this category hasnt't already been added
      const categoryPart = cat.name.split(':')[0];
      if (!noRepeats.some(item => item.name === categoryPart)) {
        console.log('no repeats', noRepeats);
        noRepeats.push({
          id: cat.id,
          name: categoryPart
        });
      }
    }else{
      console.log(':', noRepeats);

      // If not a subCategory, just add to list
      noRepeats.push({
        id: cat.id, name: cat.name
      })
    }
  }
  return noRepeats
  }
}
