import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCategoriesDataService } from '../../services/quiz-categories-data.service';
import  { type CategoryDataInterface } from '../../interfaces/category-interface';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs';
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
  default: CategoryDataInterface = {
    id: NaN,
    name: ''
  }
// simply used to display drop down filtered options
typedFilter: FormControl<string | null> = new FormControl<string | null>('');
// Input that is actulaly stored for later createQuiz()
input: FormControl<CategoryDataInterface | null> = new FormControl<CategoryDataInterface | null>(this.default);
uniqueCategories = new Set<string>(); 
newList: any = []
@Input() label!: string;
// From parent
@Input() List$: Observable<CategoryDataInterface[]>;


@Input() set selected(value: CategoryDataInterface){
  if (value) {
    this.input.setValue(value);
  } else {
    this.input.setValue(this.default);
  }
}
  // Child to Parent
  @Output() selectedChange: EventEmitter<CategoryDataInterface> =
   new EventEmitter<CategoryDataInterface>();

constructor(private quizCategoriesDataService :QuizCategoriesDataService) { 
  this.List$ = this.typedFilter.valueChanges.pipe(
    debounceTime(500), distinctUntilChanged(),
    startWith(''),
    switchMap((typed) => {
      return this.quizCategoriesDataService.getCategoryData().pipe(
      map((categories) =>
      categories.filter((category: CategoryDataInterface) =>
      category.name.toLowerCase().indexOf(typed!.toLowerCase()) !== -1
      )
    ))
}))
     
     this.List$.subscribe((x) => {
      console.group('x',x)
     })
    }

newSelection(entry: CategoryDataInterface) {
  this.input.setValue(entry);
  this.selectedChange.emit(entry);
}
}