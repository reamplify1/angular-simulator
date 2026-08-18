import { IAdvantage } from '../interfaces/IAdvantage';
import {
  faDollarSign,
  faPeopleGroup,
  faShieldHalved,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const faPeople: IconDefinition = faPeopleGroup;
const faShield: IconDefinition = faShieldHalved;
const faDollar: IconDefinition = faDollarSign;

export const advantages: IAdvantage[] = [
  {
    id: 1,
    icon: faPeople,
    title: 'home-page.advantages.experiencedGuide.title',
    text: 'home-page.advantages.experiencedGuide.text',
  },
  {
    id: 2,
    icon: faShield,
    title: 'home-page.advantages.safeHike.title',
    text: 'home-page.advantages.safeHike.text',
  },
  {
    id: 3,
    icon: faDollar,
    title: 'home-page.advantages.loyalPrices.title',
    text: 'home-page.advantages.loyalPrices.text',
  },
];
