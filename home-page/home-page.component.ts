import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCategoriesDataService } from '../services/quiz-categories-data.service';
import  { type CategoryDataInterface } from '../interfaces/category-interface';
import {  Observable, of } from 'rxjs';
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
export class HomePageComponent implements OnInit {
  // quiz maker options
  categories$: Observable<CategoryDataInterface[]> = new Observable<CategoryDataInterface[]>;
  difficulties$: Observable<CategoryDataInterface[]> = new Observable<CategoryDataInterface[]>;
  difficulties: CategoryDataInterface[] = [
    { id: 0, name: 'easy' },
    { id: 1, name: 'medium' },
    { id:2,  name: 'hard' }
  ];
  // Quiz
  quizMade: boolean = false;
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

  // updateSelection(country: Country) {
  //   this.country = country;
  //   this.state = null;
  //   this.currentCountry$.next(country);
  // }

  // create quiz
  createQuiz(): void {
    this.questions$ = this.createQuizService.createQuiz(
      this.quizForm.controls['chosenCategory'].value,
      this.quizForm.controls['chosenDifficulty'].value
    );
  }

  // efficent rendering
  trackByCats(i: number, category: CategoryDataInterface): string {
    return category.name;
  }
  trackByDifficulty(i: number, difficulty: string): string {
    return difficulty;
  }
}
