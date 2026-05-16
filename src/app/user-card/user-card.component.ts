import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
import { HoverBoldDirective } from '../directives/bold-text.directive';
import { AnimatedGradientDirective } from '../directives/animated-gradient.directive';


@Component({
  selector: 'app-user-card',
  imports: [CommonModule, PhoneFormatPipe, HoverBoldDirective, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
