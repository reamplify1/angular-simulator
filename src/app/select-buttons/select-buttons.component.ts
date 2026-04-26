import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemesService } from '../services/themes.service';
import { AppTheme } from '../types/AppTheme';
import type { ITheme } from '../interfaces/ITheme';

@Component({
  selector: 'app-select-buttons',
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './select-buttons.component.html',
  styleUrl: './select-buttons.component.scss',
})
export class SelectbuttonMultipleDemo {

  themeService: ThemesService = inject(ThemesService)

  value: AppTheme = 'aura';

  themeOptions: ITheme[] = [
    { name: 'Aura', value: 'aura' },
    { name: 'Lara', value: 'lara' },
    { name: 'Nora', value: 'nora' },
    { name: 'Custom', value: 'custom' }
  ];

  @Output() themeChange = new EventEmitter<AppTheme>();

  onThemeChange(theme: AppTheme) {
    this.themeService.setTheme(theme);
    this.themeChange.emit(theme);
  }

}

