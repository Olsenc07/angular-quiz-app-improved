import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCategoriesDataService } from '../services/quiz-categories-data.service';
import  { type CategoryDataInterface } from '../interfaces/category-interface';
import {  Observable, Subscription, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateQuizService } from '../services/create-quiz.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { type QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuizTemplateComponent } from '../quiz-template/quiz-template.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReusableDropdownComponent } from './reusable-dropdown/reusable-dropdown.component'
@Component({
  standalone: true,
  selector: 'app-home-template',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    QuizTemplateComponent,
    ReusableDropdownComponent
  ],
})
export class HomePageComponent implements OnInit, OnDestroy {
  // quiz maker options
  categories$: Observable<CategoryDataInterface[]> = new Observable<CategoryDataInterface[]>;
  subCategories$: Observable<CategoryDataInterface[]> = new Observable<CategoryDataInterface[]>;
    // Reset the flag when the selection changes
  subCategoriesLoaded: boolean = false;
  // Create a subject to manage subscription termination
  private subCategorySub?: Subscription;
  difficulties$: Observable<CategoryDataInterface[]> = new Observable<CategoryDataInterface[]>;
  difficulties: CategoryDataInterface[] = [
    { id: 0, name: 'Easy' }, // uppercase is more aesthetically pleasing
    { id: 1, name: 'Medium' },
    { id: 2,  name: 'Hard' } 
  ];

  // Quiz
  questions$: Observable<QuizQuestionsInterface[]> = new Observable<QuizQuestionsInterface[]>;
  quizForm: FormGroup = new FormGroup({
    chosenCategory: new FormControl<string | null>('', [Validators.required]),
    chosenDifficulty: new FormControl<string | null>('', [Validators.required]),
  });

  constructor(
    private quizCategoriesDataService: QuizCategoriesDataService,
    private createQuizService: CreateQuizService
  ) {}

  ngOnInit(): void {
    // get catgeory data
    this.categories$ = this.quizCategoriesDataService.getCategoryData();
    this.difficulties$ = of(this.difficulties);
  }

  updateSelection(category: CategoryDataInterface): void {
    // get subCategory list
  this.subCategories$ = this.quizCategoriesDataService.getSubCategoryData(category.name);
  this.subCategorySub = this.subCategories$.subscribe({
    next: (data) => {
      if(data.length > 0){
        this.subCategoriesLoaded = true;
        if(this.quizForm.controls['chosenCategory'].value){
        this.quizForm.controls['chosenCategory'].reset(null)
        }
      }else{
        this.subCategoriesLoaded = false;
        // assign category to formcontrol value
        this.quizForm.controls['chosenCategory'].setValue(category.id)
      }
    },
    error: (error) => {
      console.error('Error loading subcategories:', error);
      this.subCategoriesLoaded = false;
    }
  });
  }
  // assign subcategory to formcontrols
  setSubFormControl(formValue: CategoryDataInterface): void {
    this.quizForm.controls['chosenCategory'].setValue(formValue.id);
  }
  setDifFormControl(difficulyValue: CategoryDataInterface): void {
    // query requires lower case name
    this.quizForm.controls['chosenDifficulty'].setValue(difficulyValue.name.toLowerCase());
  }
  // create quiz
  createQuiz(): void {
    this.questions$ = this.createQuizService.createQuiz(
      this.quizForm.controls['chosenCategory'].value, 
      this.quizForm.controls['chosenDifficulty'].value,
      5
    );
  }
  ngOnDestroy(): void {
    // if sub has been made
    this.subCategorySub?.unsubscribe();
  }
}
