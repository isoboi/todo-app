import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment from 'moment';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { switchMap } from 'rxjs';
import { Path } from '../../../core/enums/path';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@UntilDestroy()
@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepicker,
    CdkTextareaAutosize,
    NgxMaterialTimepickerModule,
    MatButton,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepickerModule

  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoService,
  ) {
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expirationDate: ['', [Validators.required]],
      expirationTime: ['']
    });
  }

  get title() {
    return this.todoForm.get('title');
  }

  get expirationDate() {
    return this.todoForm.get('expirationDate');
  }


  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const { title, expirationDate, expirationTime } = this.todoForm.value;
    let expirationMoment: moment.Moment;
    expirationMoment = moment(expirationDate);

    if (expirationTime) {
      const m = moment(expirationTime, 'h:mm A');
      const time24 = m.format('HH:mm');

      const [hours, minutes] = time24.split(':');
      expirationMoment.set({ hour: +hours, minute: +minutes });
    }

    if (expirationMoment.isBefore(moment())) {
      this.todoForm.controls['expirationDate'].setErrors({ matDatepickerMin: true });
      return;
    }

    const todo = {
      title,
      expirationDate: expirationMoment.toISOString(),
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    this.todoService.getTodos()
      .pipe(
        untilDestroyed(this),
        switchMap((todos: Todo[] | undefined) => {
          const newTodos = todos ? [...todos, todo] : [todo];
          return this.todoService.setTodos(newTodos)
        })
      )
      .subscribe(() => {
        this.router.navigate([Path.list]);
      });
  }

  goBack(): void {
    this.router.navigate([Path.list]);
  }
}

