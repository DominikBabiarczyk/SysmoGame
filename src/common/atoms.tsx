import { cn } from "@src/styles/cn";

interface BoxProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
  numberOfLines?: number;
}

export function Box<T extends React.ElementType = "div">({
  as: asProp,
  className,
  ...props
}: BoxProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>) {
  const Component = asProp || "div";
  return <Component className={cn("flex flex-col", className)} {...props} />;
}

interface TextProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export function Text<T extends React.ElementType = "p">({
  as: asProp,
  numberOfLines,
  ...props
}: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = asProp || "p";
  return <Component {...props} />;
}
