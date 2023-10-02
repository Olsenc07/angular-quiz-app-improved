import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
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
import { CreateQuizService } from '../services/create-quiz.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
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
    MatTooltipModule
  ],
})
export class QuizTemplateComponent implements OnChanges, OnDestroy {
  // create forms
  answersForm: FormGroup<{}> = this.fb.group({});
  // Only used once
  newQuestionSub?: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private createQuizService: CreateQuizService
  ) {}
  
  // Define arrays
  answerList: QuestionsRandomizedInterface[] = [];
  completeList: CompleteQuestion[] = [];

  // Recieve data from parent
  @Input({ required: true })
  question: QuizQuestionsInterface[] | null | undefined;
  // input original params to create quiz
  @Input({ required: true })
  params: FormGroup | undefined;
  ngOnChanges(): void {
    // create new array after making objects of answers
    // to indicate correct or incorrect answers
    // assign which question these answers were in
    if (this.question?.length) {
     this.addAnswer(this.question, true);
      }
    }
  
  addAnswer(q: QuizQuestionsInterface[], originalQ: boolean, swapIndex?: number): void {
  for (let i = 0; i < q.length; i++) {
    this.answerList.push({
      id: i,
      question: q![i].correct_answer,
      answer: true,
    });
    for (const c of q![i].incorrect_answers) {
      this.answerList.push({
        id: i,
        question: c,
        answer: false,
      });
    }
    if(originalQ){
    // add only for first input, not when question is swapped
    this.randomizeQuestions(q![i].question);
    const name: string = i.toString();
    this.answersForm.addControl(
      name,
      this.fb.control<string>('', [Validators.required])
    );
    }else{
      // swap answer
      console.log('new q', q);
      console.log('new list',  this.answerList);
      this.randomizeQuestions(q![i].question, swapIndex)
    }
  }
}
  // Randomize questions
  private randomizeQuestions(title: string, swapIndex?: number): void {
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
    if(typeof swapIndex === 'number'){
      // replace old question
      this.completeList[swapIndex] = {
        title,
        questions: randomizedAnswerList,
      }
      console.log('boogers',  this.completeList);
    }else{
      // creating original list
    this.completeList.push({
      title,
      questions: randomizedAnswerList,
    });
    };
  }

// One use per quiz
swapQuestion(index: number): void{
  // needs to make a request for one question
  this.newQuestionSub = this.createQuizService.createQuiz(
    this.params!.controls['chosenCategory'].value, 
      this.params!.controls['chosenDifficulty'].value,
    1
  ).subscribe((replacementQuestion: QuizQuestionsInterface[]) => {
    // need to add chosen and answer to object
    this.addAnswer(replacementQuestion, false, index)
    // clear the form control associated with old question
    this.answersForm.get(index.toString())?.reset('');
  });
};

  // efficient array rending
  trackByList(index: number, list: CompleteQuestion): CompleteQuestion {
    return list;
  };
  trackByQuestions(
    index: number,
    questions: QuestionsRandomizedInterface
  ): QuestionsRandomizedInterface {
    return questions;
  };

  answered(answer: QuestionsRandomizedInterface): void {
    const appropriateForm: string = answer.id.toString();
    console.log('answered new', appropriateForm);
    // unclick answer
    if (
      answer.id == this.answersForm.get(appropriateForm)?.value.id &&
      this.answersForm.get(appropriateForm)?.value.question == answer.question
    ) {
      // reset
      this.answersForm.get(appropriateForm)?.reset('');
    } else {
      // chosen answer
      this.answersForm.get(appropriateForm)?.setValue({
        id: answer.id,
        question: answer.question,
        answer: answer.answer,
      });
    };
    console.log('answered', this.answersForm);
  };

  submitQuiz(Choices: FormGroup, List: CompleteQuestion[]): void {
    const values: QuestionsRandomizedInterface[] = [];
    // loop and take control values
    for (let i = 0; i < List.length; i++) {
      const c: string = i.toString();
      // need to only assign chosen to chosen one!!
      List.forEach((comlpeteQuestions: CompleteQuestion): void => {
        comlpeteQuestions.questions.forEach(
          (
            questionsRandomizedInterface: QuestionsRandomizedInterface
          ): void => {
            if (
              Choices.get(c)?.value.question ===
              questionsRandomizedInterface.question
            ) {
              questionsRandomizedInterface.chosen = true;
            }
          }
        );
      });
    };
    // navigate to answer page
    this.router.navigate(['/answers/:'], {
      // passing objects as strings through url
      queryParams: {
        questions: JSON.stringify(List),
      },
    });
  };
  //clean up
  ngOnDestroy(): void {
    // if Subscription has been made
    this.newQuestionSub?.unsubscribe();
  }
}
