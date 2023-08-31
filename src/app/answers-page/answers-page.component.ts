import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.actRoute.queryParamMap.subscribe((params) => {
      // ! indicates that this param wont return null
      this.selections = JSON.parse(params.get('categories')!);

      this.completeList = JSON.parse(params.get('questions')!);

      this.completeList.forEach((x: CompleteQuestion): void => {
        x.questions.forEach((g: QuestionsRandomizedInterface): void => {
          this.selections.forEach((t: QuestionsRandomizedInterface): void => {
            if (t.question === g.question && t.answer === true) {
              this.score++;
              g.chosen = true;
            }
            if (t.question === g.question && t.answer === false) {
              g.chosen = false;
            }
            if (g.answer === true) {
              g.correct = true;
            }
          });
        });
      });
    });
  }

  restart(): void {
    this.router.navigate(['/home']);
  }
}
