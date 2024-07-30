import { Routes } from '@angular/router';
import { AddTodoComponent } from './todos/components/add-todo/add-todo.component';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';

export const routes: Routes = [
  { path: 'add', component: AddTodoComponent },
  { path: 'list', component: TodoListComponent },
  { path: 'favorite', component: TodoListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
