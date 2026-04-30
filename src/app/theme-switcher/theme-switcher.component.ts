import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../services/theme.service';
import { AppTheme } from '../../enums/AppTheme';
import type { ITheme } from '../interfaces/ITheme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {

  themeService: ThemeService = inject(ThemeService)

  value: AppTheme = AppTheme.AURA;

  themeOptions: ITheme[] = [
    { name: 'Aura', value: AppTheme.AURA },
    { name: 'Lara', value: AppTheme.LARA },
    { name: 'Nora', value: AppTheme.NORA },
    { name: 'Custom', value: AppTheme.CUSTOM }
  ];

  ngOnInit(): void {
    this.value = this.themeService.getTheme();
  }

  onThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
    this.value = theme;
  }

}

