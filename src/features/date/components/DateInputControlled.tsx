import React from 'react';
import {FieldValues, UseControllerProps, useController} from 'react-hook-form';
import {DateInput} from './DateInput';

export function DateInputControlled<T extends FieldValues>(
  props: UseControllerProps<T> & {
    placeholder?: string;
    initialDate?: Date;
    mode?: 'date' | 'time';
    maximumDate?: Date;
    minimunDate?: Date;
    type?: 'default' | 'curve' | 'line';
    label?: string;
    required?: boolean;
  },
) {
  const {field, fieldState} = useController(props);
  return (
    <DateInput
      date={field.value}
      // @ts-ignore
      onDateChange={field.onChange}
      error={fieldState.error?.message}
      placeholder={props.placeholder}
      initialDate={props.initialDate}
      mode={props.mode}
      maximumDate={props.maximumDate}
      minimunDate={props.minimunDate}
      type={props.type}
      label={props.label}
      required={props.required}
    />
  );
}
