import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-disabled-demo',
    templateUrl: './toggle-switch-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch]
})
export class ToggleSwitchDisabledDemo {

    checked: boolean = false;

    @Output() toggle = new EventEmitter<boolean>();

    onToggle() {
      this.toggle.emit(this.checked);
    }

}
