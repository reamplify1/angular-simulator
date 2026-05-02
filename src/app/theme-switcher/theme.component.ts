import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../services/theme.service';
import { AppTheme } from '../../enums/AppTheme';
import type { ITheme } from '../interfaces/ITheme';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {

  themeService: ThemeService = inject(ThemeService)

  theme: AppTheme = AppTheme.AURA;

  themeOptions: ITheme[] = [
    { name: 'Aura', value: AppTheme.AURA },
    { name: 'Lara', value: AppTheme.LARA },
    { name: 'Nora', value: AppTheme.NORA },
    { name: 'Custom', value: AppTheme.CUSTOM }
  ];

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
  }

  onThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
    this.theme = theme;
  }

}

