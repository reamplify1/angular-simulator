import { Component } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;
  faAngleRight: IconDefinition = faAngleRight;

  servicesInfo: string[] = [
    'footer.servicesList.summerMountainWalks',
    'footer.servicesList.winterMountainHikes',
    'footer.servicesList.mountainTemples',
    'footer.servicesList.extremeTourism',
    'footer.servicesList.amazonJungleHikes',
    'footer.servicesList.africaTrip',
  ];

  travelInfo: string[] = [
    'footer.travelList.longHike',
    'footer.travelList.essentialItems',
    'footer.travelList.medicalInsurance',
    'footer.travelList.forDoctors',
  ];

}
