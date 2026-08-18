import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { HoverBoldDirective } from '../../../../shared/directives/bold-text.directive';
import { AnimatedGradientDirective } from '../../../../shared/directives/animated-gradient.directive';
import { PhoneFormat } from '../../../../../enums/PhoneFormat';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  imports: [
    CommonModule,
    PhoneFormatPipe,
    HoverBoldDirective,
    AnimatedGradientDirective,
    TranslatePipe,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
