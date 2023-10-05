import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import  { type CategoryDataInterface } from '../../interfaces/category-interface';
import { BehaviorSubject, Observable, Subscription, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HideBeforeColonPipe } from '../../pipes/hide-category.pipe';
import { BoldPipe } from '../../pipes/bold.pipe';

@Component({
  standalone: true,
  selector: 'app-reusable-dropdown',
  templateUrl: './reusable-dropdown.component.html',
  styleUrls: ['../home-page.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ReusableDropdownComponent,
    HideBeforeColonPipe,
    BoldPipe
  ]
})
export class ReusableDropdownComponent implements OnInit, OnDestroy {
// simply used to display drop down filtered options
typedFilter: FormControl<string | null> = new FormControl<string | null>('');
// From parent
@Input() label: string | null = null;
@Input() hint: string | null = null;
@Input()List$!: Observable<CategoryDataInterface[]>;
private listSub?: Subscription;
  // Define an initial list as a BehaviorSubject
initialList$: BehaviorSubject<CategoryDataInterface[]> = new BehaviorSubject<CategoryDataInterface[]>([]);
  // Child to Parent
  @Output() selectedChange: EventEmitter<CategoryDataInterface> = new EventEmitter<CategoryDataInterface>();
  @Output() difficultyFormControl: EventEmitter<CategoryDataInterface> = new EventEmitter<CategoryDataInterface>();

ngOnInit(): void {
 this.listSub = this.List$.subscribe((categories: CategoryDataInterface[]) => {
    this.initialList$.next(categories);
  });
  // Filters list
 // startWith('') allows list to be displayed before typing
  this.List$ = combineLatest([this.typedFilter.valueChanges.pipe(
    debounceTime(500), distinctUntilChanged(), startWith('')),
    this.initialList$]).pipe(
      map(([typed, categories]) =>
      categories.filter((category: CategoryDataInterface) =>
      category.name.toLowerCase().indexOf(typed!.toLowerCase()) !== -1)));
};
// Selection has been made
newSelection(entry: CategoryDataInterface) {
  // If choice came from difficulty drop down
  if(this.hint === 'Challenge yourself'){
    this.difficultyFormControl.emit(entry);
  }else{
    this.selectedChange.emit(entry);
  };
};
  // efficent rendering
  trackByList(i: number, list: CategoryDataInterface): string {
    return list.name;
  };
   //clean up
   ngOnDestroy(): void {
    // if Subscription has been made
    this.listSub?.unsubscribe();
    this.initialList$.complete();
  };
}
