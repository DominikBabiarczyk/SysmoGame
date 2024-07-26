import React from 'react';
import {FieldValues, Control, Path, Controller} from 'react-hook-form';
import {GalleryPicker} from './GalleryPicker';

interface GalleryPickerControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  maxImages?: number;
  rounded?: boolean;
}

export function GalleryPickerControlled<T extends FieldValues>({
  control,
  name,
  maxImages,
  rounded,
}: GalleryPickerControlledProps<T>) {
  return (
    <Controller
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <GalleryPicker
          onImagesChange={files => {
            if (typeof files === 'function') {
              // @ts-ignore
              onChange(files(value));
              return;
            }
            onChange(value);
          }}
          images={value}
          error={error?.message}
          maxImages={maxImages ? maxImages : 1}
          rounded={rounded}
        />
      )}
      name={name}
    />
  );
}
