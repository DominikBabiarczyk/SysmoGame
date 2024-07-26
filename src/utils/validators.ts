import { TFunction } from "i18next";
import { z } from "zod";

export const emailRegex = /^\S+@\S+\.\S+$/;
export const phoneRegex = /^(\+\d{2})\d{9}$/;

export const priceNumericString = (t: TFunction) => {
    return z.preprocess(
      x => {
        if (!x) {
          return undefined;
        }
        if (typeof x !== 'string') {
          return x.toString();
        }
        if (!x.includes(',') && !x.includes('.')) {
          return x.toString();
        }
        const s = x.replace(',', '.');
        const numberValue = Number(s);
        if (numberValue.toFixed(2) !== s) {
          return NaN;
        }
        return numberValue.toString();
      },
      z.string({
        required_error: t('auth:error:required'),
        invalid_type_error: t('auth:error:invalid-number'),
      }),
    );
  };