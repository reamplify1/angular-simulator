// import { MyCustomPreset } from './preset';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const CustomIndigoPreset = definePreset(Aura, {

  semantic: {
    primary: {
      500: 'var(--secondary-color)',
      600: 'var(--secondary-color)',
      700: 'var(--secondary-color)',
    },
    colorScheme: {
      light: {
        primary: {
          hoverColor: 'var(--yellow-color)',
          activeColor: 'var(--third-color)',
          inverseColor: 'var(--primary-color)',
        }
      },
      dark: {
        primary: {
          hoverColor: 'var(--yellow-color)',
          activeColor: 'var(--third-color)',
          inverseColor: 'var(--primary-color)',
        }
      }
    }
  }

});
