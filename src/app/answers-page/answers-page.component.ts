import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, type ParamMap, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CompleteQuestion } from '../interfaces/complete-question-interface';
import { SpecialCharacterPipe } from '../pipes/special-character.pipe';
import { QuestionsRandomizedInterface } from '../interfaces/questions-randomized-interface';
@Component({
  standalone: true,
  selector: 'app-answers-page',
  templateUrl: './answers-page.component.html',
  styleUrls: ['./answers-page.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    SpecialCharacterPipe,
    MatButtonModule,
  ],
})
export class AnswersPageComponent implements OnInit {
  completeList: CompleteQuestion[] = [];
  selections: QuestionsRandomizedInterface[] = [];
  score: number = 0;
  constructor(private actRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.actRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.selections = JSON.parse(params.get('categories')!);
      this.completeList = JSON.parse(params.get('questions')!);
      this.completeList.forEach((completeQuestion: CompleteQuestion): void => {
        completeQuestion.questions.forEach(
          (questionsRandomInterface: QuestionsRandomizedInterface): void => {
            this.selections.forEach(
              (
                questionsRandomizedInterface: QuestionsRandomizedInterface
              ): void => {
                if (
                  questionsRandomizedInterface.question ===
                    questionsRandomInterface.question &&
                  questionsRandomizedInterface.answer
                ) {
                  this.score++;
                  questionsRandomInterface.chosen = true;
                }
                if (
                  questionsRandomizedInterface.question ===
                    questionsRandomInterface.question &&
                  !questionsRandomizedInterface.answer
                ) {
                  questionsRandomInterface.chosen = false;
                }
                if (questionsRandomInterface.answer) {
                  questionsRandomInterface.correct = true;
                }
              }
            );
          }
        );
      });
    });
  }

  // efficent rendering
  trackByCompleteList(i: number, list: CompleteQuestion): CompleteQuestion {
    console.log('i', i);
    console.log('d', list);
    return list;
  }
  trackByList(
    i: number,
    questions: QuestionsRandomizedInterface
  ): QuestionsRandomizedInterface {
    console.log('p', i);
    console.log('q', questions);
    return questions;
  }

  restart(): void {
    this.router.navigate(['/home']);
  }
}
