import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, type ParamMap, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { type CompleteQuestion } from '../interfaces/complete-question-interface';
import { SpecialCharacterPipe } from '../pipes/special-character.pipe';
import { type QuestionsRandomizedInterface } from '../interfaces/questions-randomized-interface';
import { Subscription } from 'rxjs';
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
export class AnswersPageComponent implements OnInit, OnDestroy {
  completeList: CompleteQuestion[] = [];
  selections: QuestionsRandomizedInterface[] = [];
  score: number = 0;
  routeSub$: Subscription | undefined;
  constructor(private actRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeSub$ = this.actRoute.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.selections = JSON.parse(params.get('categories')!);
        this.completeList = JSON.parse(params.get('questions')!);
        this.completeList.forEach(
          (completeQuestion: CompleteQuestion): void => {
            completeQuestion.questions.forEach(
              (
                questionsRandomInterface: QuestionsRandomizedInterface
              ): void => {
                // fix this i think
                this.selections.forEach(
                  (
                    questionsRandomizedInterface: QuestionsRandomizedInterface
                  ): void => {
                    if (
                      // fix this part
                      (questionsRandomizedInterface?.chosen &&
                        questionsRandomizedInterface.answer) === true
                    ) {
                      this.score++;
                      // fix this but need to assign
                      questionsRandomInterface.chosen = true;
                    }
                  }
                );
              }
            );
          }
        );
        console.log('darn', this.selections);
      }
    );
  }

  ngOnDestroy(): void {
    // unsubscribe from observable
    this.routeSub$?.unsubscribe();
  }

  // efficent rendering
  trackByCompleteList(i: number, list: CompleteQuestion): CompleteQuestion {
    return list;
  }
  trackByList(
    i: number,
    questions: QuestionsRandomizedInterface
  ): QuestionsRandomizedInterface {
    console.log('time', questions);
    return questions;
  }

  restart(): void {
    this.router.navigate(['/home']);
  }
}
