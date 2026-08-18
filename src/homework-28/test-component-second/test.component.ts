import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-test-second',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentSecond implements OnInit {

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  count: number = 0;
  http: HttpClient = inject(HttpClient);
  intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.count++;
    this.cdr.markForCheck();
    this.detectChanges();
    this.scenarioDetach();
    this.incrementClick();
    this.scenarioTimeout();
    this.scenarioPromise();
    this.scenarioInterval();
    this.scenarioReattach();
  }
  // markForCheck - Поставили на очередь проверку компонента при следующем вызове CD. Интерфейс обновился. CD произошел после выполнения завершения хука ngOnInit. Так как стратегия OnPush и никаких асинхронных событий не произошло - markForCheck Нужен для того, чтобы ангуляр увидел изменения и отрисовал их.

  detectChanges() {
    this.count++;
    this.cdr.detectChanges();
  }

  // Тут проверка поиска изменений запускается сразу. Текущий компонент проверен, но не родитель. Он используется тогда, когда Angular не знает об изменениях в данных или когда стандартная глобальная проверка слишком тяжела для производительности.

  scenarioDetach() {
    console.log('detach()');
    this.cdr.detach();
  }

  incrementClick() {
    this.count += 10;
    console.log('click', this.count);
  }

  scenarioTimeout() {
    setTimeout(() => {
      this.count += 10;
      console.log('setTimeout сработал, count =', this.count);
    }, 1000);
  }

  scenarioPromise() {
    Promise.resolve().then(() => {
      this.count += 100;
      console.log('Promise сработал, count =', this.count);
    });
  }

  scenarioHttp() {
    this.http
      .get<{ id: number }>('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(() => {
        this.count += 50;
        console.log('HTTP Запрос завершен, count =', this.count);
        this.cdr.markForCheck();
      });
  }

  scenarioInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.count += 5;
      console.log('setInterval сработал, count =', this.count);
    }, 2000);
  }

  scenarioCombo() {
    this.count += 1;

    Promise.resolve().then(() => {
      this.count += 2;
      this.cdr.markForCheck();
    });

    setTimeout(() => {
      this.count += 3;
      this.cdr.markForCheck();
    }, 500);

    this.cdr.markForCheck();
  }

  scenarioReattach() {
    console.log('Вызов reattach(): компонент вернулся в CD');
    this.cdr.reattach();
  }
  
}
