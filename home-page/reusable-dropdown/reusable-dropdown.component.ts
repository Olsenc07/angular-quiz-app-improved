import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCategoriesDataService } from '../../services/quiz-categories-data.service';
import  { type CategoryDataInterface } from '../../interfaces/category-interface';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateQuizService } from '../../services/create-quiz.service';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { QuizTemplateComponent } from '../../quiz-template/quiz-template.component';
import { MatDividerModule } from '@angular/material/divider';
import { HideBeforeColonPipe } from '../../pipes/hide-category.pipe';
import { BoldPipe } from '../../pipes/bold.pipe';
import { TypeOfPipe } from '../../pipes/typeof.pipe';



@Component({
  standalone: true,
  selector: 'app-reusable-dropdown',
  templateUrl: './reusable-dropdown.component.html',
  styleUrls: ['../home-page.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ReusableDropdownComponent,
    HideBeforeColonPipe,
    BoldPipe,
    TypeOfPipe
  ]
})
export class ReusableDropdownComponent {
// simply used to display drop down filtered options
typedFilter: FormControl<string | null> = new FormControl<string | null>('');
// From parent
@Input() label: string | null = null;;
@Input() hint: string | null = null;
@Input()List$!: Observable<CategoryDataInterface[]>;
  // Define an initial list as a BehaviorSubject
initialList$: BehaviorSubject<CategoryDataInterface[]> = new BehaviorSubject<CategoryDataInterface[]>([]);


  // Child to Parent
  @Output() selectedChange: EventEmitter<CategoryDataInterface> = new EventEmitter<CategoryDataInterface>();
  @Output() difficultyFormControl: EventEmitter<CategoryDataInterface> = new EventEmitter<CategoryDataInterface>();

constructor() {};

ngOnInit(){
  this.List$.subscribe((categories: CategoryDataInterface[]) => {
    this.initialList$.next(categories);
  });
 // startWith('') allows list to be displayed before typing
  // Filters list
  this.List$ = combineLatest([this.typedFilter.valueChanges.pipe(
    debounceTime(500), distinctUntilChanged(), startWith('')),
    this.initialList$]).pipe(
      map(([typed, categories]) =>
      categories.filter((category: CategoryDataInterface) =>
      category.name.toLowerCase().indexOf(typed!.toLowerCase()) !== -1
      )
          ))
}

newSelection(entry: CategoryDataInterface) {
if(this.hint == 'Challenge yourself'){
  this.difficultyFormControl.emit(entry);
  console.log('dif');
}else{
  this.selectedChange.emit(entry);
  console.log('cat or sub');

}
}
}