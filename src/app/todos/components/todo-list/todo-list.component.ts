import { DatePipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListOption,
  MatListSubheaderCssMatStyler,
  MatSelectionList
} from '@angular/material/list';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment from 'moment';
import { debounceTime } from 'rxjs';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { DELAY_MS, TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';

@UntilDestroy()
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatList,
    MatListItem,
    MatCheckbox,
    DatePipe,
    MatIcon,
    NgForOf,
    MatIconButton,
    MatSelectionList,
    MatListOption,
    MatListSubheaderCssMatStyler,
    MatDivider,
    TodoListItemComponent,
    TodoListItemComponent,
    TodoListItemComponent,
    TodoListItemComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatToolbar
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  public todayTodos: Todo[] = [];
  public otherTodos: Todo[] = [];
  public readonly displayedColumns: string[] = ['title', 'createdAt', 'timeLeft', 'actions',];
  public isListRoute: boolean;


  constructor(private todoService: TodoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTodos();
    this.todoService.todos
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(todos => {
        this.filterTodos(todos);
      });
    this.isListRoute = this.router.url.includes('/list');
  }

  isToday(date: string): boolean {
    return moment(date).isSame(moment(), 'day');
  }

  timeLeft(date: string): number {
    return moment(date).diff(moment(), 'minutes');
  }

  toggleFavorite(todo: Todo): void {
    todo.isFavorite = !todo.isFavorite;
    this.updateTodos();
  }

  remove(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.updateTodos();
  }

  private updateTodos(): void {
    this.todoService.setTodos(this.todos)
      .pipe(
        untilDestroyed(this),
        debounceTime(DELAY_MS))
      .subscribe();
  }

  private getTodos(): void {
    this.todoService.getTodos()
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  private filterTodos(todos: Todo[] | undefined) {
    if (todos) {
      this.todos = todos;
      this.todayTodos = todos.filter(todo => this.isToday(todo.expirationDate));
      this.otherTodos = todos.filter(todo => {
        if (this.isListRoute) {
          return !this.isToday(todo.expirationDate)
        }
        return todo.isFavorite
      });
    }
  }

}
