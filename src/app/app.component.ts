import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'Румтибет';
  location: string = '';
  date: string = '';
  participants: string = '';
  liveInputText = '';
  dateNow: Date = new Date();
  displayTime: boolean = true;
  clickerCounter: number = 0;
  loading: boolean = true;

  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  stringCollection: Collection<string> = new Collection<string>(['Boston', 'London', 'Винница']);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();

    setTimeout(() => {
      this.loading = false;
    }, 2000)

    setInterval(() => {
      this.dateNow = new Date();
      }, 1000);

  }

  toggleDateOrClick() {
    this.displayTime = !this.displayTime
  }

  isDisabledBtn(): boolean {
    return !this.location || !this.date || !this.participants
  }
    increaseCounter() {
    this.clickerCounter++;
  }


   decreaseCounter() {
    if (this.clickerCounter > 0) {
      this.clickerCounter--;
    }
  }

//   onDateChange() {
//   console.log(this.date);
// }

  isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  saveLastVisit(): void {
    const LAST_VISIT_KEY: string = 'last-visit';
    const now: Date = new Date();
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
  }

  saveVisitCount(): void {
    const VISIT_COUNT_KEY: string = 'visit-count';
    const visits: string | null = localStorage.getItem(VISIT_COUNT_KEY);

    let count: number = visits ? parseInt(visits) : 0;
    count++;

    localStorage.setItem(VISIT_COUNT_KEY, count.toString());
  }





  //   resetSelectParticipants() {
  //   this.participants = '';
  // }
  //   resetSelectLocation() {
  //   this.location = '';
  // }


  advantages = [
  {
    id: 1,
    icon: './images/svg/info-icon-exp.svg',
    title: 'Опытный гид',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  },
  {
    id: 2,
    icon: './images/svg/info-icon-security.svg',
    title: 'Безопасный поход',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  },
  {
    id: 3,
    icon: './images/svg/info-icon-prices.svg',
    title: 'Лояльные цены',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  }
];

}

// Домашнее задание №16:

// Основываясь на лекция №1 (https://www.youtube.com/watch?v=1WYcRTtZEts) и лекция №2 (https://www.youtube.com/watch?v=iDhIElrKpcg):

// 1. Сверстать данные блоки (https://yapx.ru/album/cw68R) с макета (https://www.figma.com/design/kj62pS6OrwQBLL9Ch3HYI6/angular-design?node-id=0-1&t=h5EVSMsxgBJ4xKaA-1). Для выделенного, красным цветом, блока использовать конструкцию @for. Добавить анимацию при наведении на блоки  (например, навелись - изменили размер блоков или сделали инверсию цветов, может добавили border) на свой вкус

// 2. В данном блоке (https://yapx.ru/album/cw7F5) реализовать следующий функционал:

// - сделать двустороннюю привязку данных для каждого инпута
// - если, хотя бы, одно из полей не заполнено — кнопка рядом должна быть задизейблена
// - для этого использовать <select> (https://doka.guide/html/select/) и <input> (https://doka.guide/html/input/), multiple (https://doka.guide/html/multiple/)

// 3. Следовать правильному порядку элементов в классе, добавить модификаторы для всех методов/свойств, если ситуация позволяет

// Макет для заданий №4-8 (https://www.figma.com/design/vLzZ88XBugSWrBpXBmyItI/homework-16?node-id=0-1&t=UAsv82d8NzT4wNla-1)

// 4. В шапке реализовать таймер, который каждую секунду выводит текущую дату, вплоть до секунды. (setInterval в помощь)

// 5. В шапке реализовать счетчик кликов. При клике  "+" добавляем единицу, при клике "-" убираем единицу . Нельзя уйти ниже 0, кнопка "-" дизейблится при 0

// 6. В шапке Реализовать кнопку, которая при нажатии отображает в шапке ИЛИ 4, ИЛИ 5 задачу. Текст кнопки также должен меняться в зависимости от того, что отображается

// 7. Реализовать live-input. При вводе текста в нег,о значение сразу отображается рядом.

// 8. Реализовать искусственную загрузку страницы. По центру экрана отображаем иконку загрузки с анимацией, спустя 2 секунды — наш макет.
