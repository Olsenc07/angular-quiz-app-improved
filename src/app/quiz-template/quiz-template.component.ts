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
import { QuizQuestionsInterface } from '../interfaces/quiz-questions-interface';
import { QuestionsRandomizedInterface } from '../interfaces/questions-randomized-interface';
import { SpecialCharacterPipe } from '../pipes/special-character.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { CompleteQuestion } from '../interfaces/complete-question-interface';

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

  // create forms
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
  question: QuizQuestionsInterface[] | null | undefined;

  ngOnChanges(): void {
    // create new array after making objects of answers
    // to indicate correct or incorrect answers
    // assign which question these answers were in
    if (this.question?.length) {
      for (let i = 0; i < this.question.length; i++) {
        this.answerList.push({
          id: i,
          question: this.question![i].correct_answer,
          answer: true,
        });
        for (const c of this.question![i].incorrect_answers) {
          this.answerList.push({ id: i, question: c, answer: false });
        }
        this.randomizeQuestions(this.question![i].question);
        const name: string = i.toString();
        this.answersForm.addControl(
          name,
          this.fb.control<string>('', [Validators.required])
        );
      }
    }
  }

  // Randomize questions
  private randomizeQuestions(title: string): void {
    const randomizedAnswerList: QuestionsRandomizedInterface[] = [];
    const length: number = this.answerList.length;
    for (let i = 0; i < length; i++) {
      const randomize: number = Math.floor(
        Math.random() * this.answerList.length
      );
      const selectedQuestion: QuestionsRandomizedInterface[] =
        this.answerList.splice(randomize, 1);
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
    if (answer.id == this.answersForm.get(appropriateForm)?.value.id) {
      // reset
      this.answersForm.get(appropriateForm)?.reset('');
    } else {
      // chosen answer
      this.answersForm.get(appropriateForm)?.setValue(answer);
    }
  }

  submitQuiz(Choices: FormGroup, List: CompleteQuestion[]): void {
    const values: QuestionsRandomizedInterface[] = [];
    // loop and take control values
    for (let i = 0; i < List.length; i++) {
      const c: string = i.toString();
      values.push(Choices.get(c)?.value);
    }
    // navigate to answer page
    this.router.navigate(['/answers/:'], {
      // passing objects as strings through url
      queryParams: {
        categories: JSON.stringify(values),
        questions: JSON.stringify(List),
      },
    });
  }
}
