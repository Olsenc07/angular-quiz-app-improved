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
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, withLatestFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateQuizService } from '../../services/create-quiz.service';
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
  styleUrls: ['./reusable-dropdown.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
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
input: FormControl<null | CategoryDataInterface> = new FormControl<null | CategoryDataInterface>(null);
uniqueCategories = new Set<string>(); 
newList: any = []
@Input() label!: string;
// From parent
@Input() List$: Observable<CategoryDataInterface[]>;


@Input() set selected(value: CategoryDataInterface | null){
  if (value) {
    this.input.setValue(value);
  } else {
    this.input.setValue(null);
  }
}
  // Child to Parent
  @Output() selectedChange: EventEmitter<CategoryDataInterface> =
   new EventEmitter<CategoryDataInterface>();

constructor(private quizCategoriesDataService :QuizCategoriesDataService) { 
  this.List$ = combineLatest([this.input.valueChanges.pipe(
    debounceTime(500), distinctUntilChanged()),
    this.quizCategoriesDataService.getCategoryData()]).pipe(
      map(([typed, categories]) =>
      categories.filter((category: CategoryDataInterface) =>
      category.name.toLowerCase().indexOf(typed!.name.toLowerCase()) !== -1
      )
    )
     )
}

newSelection(entry: CategoryDataInterface) {
  this.input.setValue(entry);
  this.selectedChange.emit(entry);
}
}
