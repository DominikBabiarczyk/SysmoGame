import React from 'react';
import {FieldValues, UseControllerProps, useController} from 'react-hook-form';
import {AppCheckbox} from './AppCheckbox';

export function AppCheckboxControlled<T extends FieldValues>(
  props: UseControllerProps<T> & {
    label: string;
    hint?: string;
    labelClassName?: string;
    type?: string;
    required?: boolean;
  },
) {
  const {field, fieldState} = useController(props);
  return (
    <AppCheckbox
      value={field.value}
      // @ts-ignore
      onChange={field.onChange}
      label={props.label}
      error={fieldState.error?.message}
      hint={props.hint}
      labelClassName={props.labelClassName}
      type={props.type}
      required={props.required}
    />
  );
}
