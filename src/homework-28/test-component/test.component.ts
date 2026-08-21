import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TestComponent implements DoCheck, OnInit {

  count: number = 0;
  http: HttpClient = inject(HttpClient);
  intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.count = 1;
    }, 2000);
  }

  ngDoCheck() {
    console.log('Change Detection');
  }

  increment() {
    this.count++;
  }

  scenarioPromise() {
    console.log('Сценарий 3: Promise');
    Promise.resolve().then(() => {
      this.count += 10;
    });
  }

  scenarioHttp() {
    console.log('Сценарий 4: HttpClient');

    this.http
      .get<{ id: number }>('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        tap(() => {
          this.count += 7;
        }),
      )
      .subscribe();
  }

  scenarioInterval() {
    console.log('Сценарий 5: setInterval');

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.count += 5;
    }, 2000);
  }

  scenarioCombo() {
    console.log('Сценарий 6');

    this.count += 1;

    Promise.resolve().then(() => {
      this.count += 10;
    });

    setTimeout(() => {
      this.count += 100;
    }, 0);
  }
  
}
