import { AxiosError } from "axios";

const isAxiosError = (
  e: unknown,
): e is AxiosError<{ message?: string; fields?: object }> => {
  // @ts-ignore
  return Boolean(e?.isAxiosError);
};

export const parseError = (e: unknown) => {
  if (isAxiosError(e)) {
    if (e.response === undefined) {
      return new Error("Unknown error");
    }
    if (e.response.data.fields !== undefined) {
      const errArr = parseNestedFields(e.response.data);
      const errArrStr = errArr.join(",\n");
      return new Error(errArrStr);
    }
    return new Error(e.response?.data.message);
  }

  if (e instanceof Error) {
    return e;
  }
  if (typeof e === "string") {
    return new Error(e);
  }
  // @ts-ignore
  return new Error("Unknown error");
};

const parseNestedFields = (data: any): string[] => {
  const result: string[] = [];

  if (data && data.fields) {
    const nestedFields = data.fields.fields;
    for (const key in nestedFields) {
      const value = nestedFields[key];
      if (Array.isArray(value)) {
        result.push(...value);
      }
    }
  }

  return result;
};
