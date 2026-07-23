import { IAppConfig } from "../interfaces/IAppConfig";
import { InjectionToken } from '@angular/core';

export const APP_CONFIG: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG');
