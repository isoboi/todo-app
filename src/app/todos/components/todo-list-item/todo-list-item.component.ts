import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { CountDownComponent } from '../../../helpers/count-down/count-down.component';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon,
    MatIconButton,
    MatCheckbox,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatToolbar,
    MatHeaderCellDef,
    MatNoDataRow,
    CountDownComponent,
  ],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
  @Input() todos: Todo[];
  @Input() title: string;
  @Input() displayedColumns: string[];
  @Input() isToday = false;

  @Output() removeTodo = new EventEmitter<Todo>();
  @Output() toggleFavoriteTodo = new EventEmitter<Todo>();

  remove(todo: Todo): void {
    this.removeTodo.emit(todo);
  }

  toggleFavorite(todo: Todo): void {
    this.toggleFavoriteTodo.emit(todo);
  }
}
