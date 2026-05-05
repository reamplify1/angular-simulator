import { IAdvantage } from "../interfaces/IAdvantage";
import { faDollarSign, faPeopleGroup, faShieldHalved, IconDefinition } from '@fortawesome/free-solid-svg-icons'

const faPeople: IconDefinition = faPeopleGroup;
const faShield: IconDefinition = faShieldHalved;
const faDollar: IconDefinition = faDollarSign;

export const advantages: IAdvantage[] = [
  {
    id: 1,
    icon: faPeople,
    title: 'Опытный гид',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  },
  {
    id: 2,
    icon: faShield,
    title: 'Безопасный поход',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  },
  {
    id: 3,
    icon: faDollar,
    title: 'Лояльные цены',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
  }
];
