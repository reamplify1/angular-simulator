import { FormControl, FormGroup } from "@angular/forms";

export type ToFormControls<T> = {
  [K in keyof T]-?: T[K] extends object
    ? FormGroup<ToFormControls<T[K]>>
    : FormControl<T[K] | null>;
};
