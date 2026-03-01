import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  companyName: string = 'Румтибет';
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;

  toggleDate(): void {
    this.isDisplayTime = !this.isDisplayTime;
  }

  increaseCounter(): void {
    this.clickerCounter++;
  }

  decreaseCounter(): void {
    if (this.clickerCounter > 0) {
      this.clickerCounter--;
    }
  }

  navigation = [
  { id: 'main-page', label: 'Главная' , link: ''},
  { id: 'guide-page', label: 'Пользователи', link: 'users' },
  ];

}
