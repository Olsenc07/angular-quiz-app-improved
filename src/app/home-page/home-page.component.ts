import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCategoriesDataService } from '../services/quiz-categories-data.service';
import { CategoryDataInterface } from '../interfaces/category-interface';
import { Observable } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateQuizService } from '../services/create-quiz.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuizTemplateComponent } from '../quiz-template/quiz-template.component';
import { MatDividerModule } from '@angular/material/divider';

import { ActivatedRoute } from '@angular/router';

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
  ],
})
export class HomePageComponent implements OnInit {
  // quiz questions
  questions: QuizQuestionsInterface[] = [];
  // quiz maker options
  categories$: Observable<CategoryDataInterface[]> = new Observable<
    CategoryDataInterface[]
  >();
  difficulties: string[] = ['easy', 'medium', 'hard'];

  quizMade: boolean = false;

  quizForm: FormGroup = new FormGroup({
    chosenCategory: new FormControl<string | null>('', Validators.required),
    chosenDifficulty: new FormControl<string | null>('', Validators.required),
  });

  constructor(
    private quizCategoriesDataService: QuizCategoriesDataService,
    private createQuizService: CreateQuizService
  ) {}

  ngOnInit(): void {
    // get catgeory data
    this.categories$ = this.quizCategoriesDataService.getCategoryData();
  }

  // create quiz
  createQuiz(): void {
    if (this.questions.length > 0) {
      // reset array
      // may need to unsubscribe
      this.questions = [];
      this.createQuizService
        .createQuiz(
          this.quizForm.controls['chosenCategory'].value,
          this.quizForm.controls['chosenDifficulty'].value
        )
        .subscribe((x: QuizQuestionsInterface[]) => {
          this.questions = x;
        });
    } else {
      this.createQuizService
        .createQuiz(
          this.quizForm.controls['chosenCategory'].value,
          this.quizForm.controls['chosenDifficulty'].value
        )
        .subscribe((x: QuizQuestionsInterface[]) => {
          this.questions = x;
        });
    }
  }

  // efficent rendering
  trackByCats(index: number, category: CategoryDataInterface): string {
    return category.name;
  }
}
