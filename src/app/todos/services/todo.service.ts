import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
export const DELAY_MS = 300;
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos = new BehaviorSubject<Todo[] | undefined>([]);
  private readonly TODOS_KEY = 'todos';

  constructor(private localStorage: StorageMap) {
  }

  getTodos(): Observable<Todo[] | undefined> {
    const schema = {
      "type": "array",
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          expirationDate: { type: 'string' },
          isFavorite: { type: 'boolean' },
          createdAt: { type: 'string' },
          timeLeft: { type: 'string' },
        },
        required: ['title']
      },

    } satisfies JSONSchema;
    return this.localStorage.get<Todo[]>(this.TODOS_KEY, schema)
      .pipe(tap(todos => this.todos.next(todos)),
        delay(DELAY_MS));
  }

  setTodos(todos: Todo[]): Observable<any> {
    return this.localStorage.set(this.TODOS_KEY, todos)
      .pipe(delay(DELAY_MS), tap(todos => this.todos.next(todos)));
  }
}
