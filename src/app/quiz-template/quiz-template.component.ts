import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { type QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';

import { type QuestionsRandomizedInterface } from '../interfaces/questions-randomized-interface';
import { SpecialCharacterPipe } from '../pipes/special-character.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { type CompleteQuestion } from '../interfaces/complete-question-interface';

@Component({
  standalone: true,
  selector: 'app-quiz-template',
  templateUrl: './quiz-template.component.html',
  styleUrls: ['./quiz-template.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatChipsModule,
    SpecialCharacterPipe,
    MatInputModule,
  ],
})
export class QuizTemplateComponent implements OnChanges {
  valid: boolean = false;

  // only want one but getting 5 of them
  answersForm = this.fb.group({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  // Define arrays
  answerList: QuestionsRandomizedInterface[] = [];
  completeList: CompleteQuestion[] = [];
  // Recieve data from parent
  @Input({ required: true })
  question!: QuizQuestionsInterface[];

  ngOnChanges(): void {
    // create new array after making objects of answers
    // to indicate correct or incorrect answers
    // assign which question these answers were in
    for (let i = 0; i < this.question.length; i++) {
      this.answerList.push({
        id: i,
        question: this.question[i].correctAnswer,
        answer: true,
      });
      for (const c of this.question[i].incorrectAnswers) {
        this.answerList.push({ id: i, question: c, answer: false });
      }
      this.randomizeQuestions(this.question[i].question);
      const name = i.toString();
      this.answersForm.addControl(
        name,
        this.fb.control<string>('', [Validators.required])
      );
    }
  }

  // Randomize questions
  private randomizeQuestions(title: string): void {
    const randomizedAnswerList: QuestionsRandomizedInterface[] = [];
    const length: number = this.answerList.length;
    for (let i = 0; i < length; i++) {
      const randomize = Math.floor(Math.random() * this.answerList.length);
      const selectedQuestion = this.answerList.splice(randomize, 1);
      randomizedAnswerList.push(selectedQuestion[0]);
    }
    this.completeList.push({
      title,
      questions: randomizedAnswerList,
    });
  }

  // efficient array rending
  trackByList(index: number, list: CompleteQuestion): string {
    return list.title + list.questions;
  }

  trackByQuestions(
    index: number,
    questions: QuestionsRandomizedInterface
  ): string {
    return questions.question;
  }

  answered(answer: QuestionsRandomizedInterface): void {
    const appropriateForm: string = answer.id.toString();

    // unclick answer
    if (answer == this.answersForm.get(appropriateForm)?.value.id) {
      // reset
      this.answersForm.get(appropriateForm)?.reset();
      // assign
      this.answersForm.get(appropriateForm)?.setValue(answer);
    } else {
      // chosen answer
      this.answersForm.get(appropriateForm)?.setValue(answer);
    }
    // UX testing
    // if(this.answersForm.valid){
    //   const submitBtn = document.getElementById("submit");
    //   submitBtn?.scrollIntoView();
    //   }
  }

  submitQuiz(Choices: FormGroup, List: CompleteQuestion[]): void {
    const values: QuestionsRandomizedInterface[] = [];
    // loop and take control values
    for (let i = 0; i < List.length; i++) {
      const c = i.toString();
      values.push(Choices.get(c)?.value);
    }

    this.router.navigate(['/answers/:'], {
      // passing objects as strings through url
      queryParams: {
        categories: JSON.stringify(values),
        questions: JSON.stringify(List),
      },
    });
  }
}
