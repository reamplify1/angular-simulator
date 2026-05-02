import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms'
import { ThemeService } from '../services/theme.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dark-mode-toggle',
    templateUrl: './dark-mode-toggle.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch, AsyncPipe]
})
export class DarkModeToggleComponent {

  private themeService: ThemeService = inject(ThemeService);

  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;

  onToggle(isDark: boolean): void {
    this.themeService.toggleDarkMode(isDark);
  }

}
